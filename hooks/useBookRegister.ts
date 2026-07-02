import { useState, useEffect } from 'react'
import { container } from '@/di/container'
import { TYPES } from '@/di/types'
import type { IBookService } from '@/interfaces/IBookService'
import type { ICategoryService } from '@/interfaces/ICategoryService'
import type { Category } from '@/models/category'
import { validateBookForm, type BookFormErrors } from '@/lib/validateBookForm'
import { ValidationError } from '@/errors/ValidationError'
import { BookRegisterRequest } from '@/models/BookRegisterRequest'

/**
 * 図書登録フォームの状態とロジックを管理するカスタムフック
 *
 * 役割は大きく3つ:
 *   1. フォームの入力値・各種状態を保持する
 *   2. 分類セレクト用のカテゴリ一覧を取得する
 *   3. 登録処理(クライアント検証 → API送信 → サーバーエラー反映)を行う
 *
 * UIは持たず、状態の提供と操作だけに責任を持つ
 * 画面コンポーネントは、このフックが返す値を受け取って表示するだけにする
 */
export function useBookRegister() {
    // --- 入力値の状態 ---
    // 各フォーム項目に対応する。input/select の値をそのまま保持する。
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [categoryId, setCategoryId] = useState('') // 選択中カテゴリのID(未選択は空文字)
    // 蔵書数は数値だが、input から受け取る値は文字列なので、いったん文字列で保持する
    // (空欄や「-1」などの途中入力を素直に扱うため。送信時に数値へ変換する)
    const [stock, setStock] = useState('')

    // --- 補助的な状態 ---
    const [categories, setCategories] = useState<Category[]>([]) // 分類セレクトの選択肢
    const [errors, setErrors] = useState<BookFormErrors>({})     // 項目ごとの検証エラー
    const [submitting, setSubmitting] = useState(false)          // 送信中フラグ(二重送信防止・ボタン制御に使う)
    const [submitError, setSubmitError] = useState<string | null>(null) // 項目に紐づかない全体エラー
    const [success, setSuccess] = useState(false)                // 登録成功フラグ

    /**
     * マウント時に一度だけカテゴリ一覧を取得して、分類セレクトの選択肢にする。
     * カテゴリは CategoryService 経由で取得する(画面は取得手段の詳細を知らない)。
     * 依存配列を空([])にしているので、この処理は初回表示時のみ実行される。
     */
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const service = container.get<ICategoryService>(TYPES.CategoryService)
                setCategories(await service.getAll())
            } catch {
                // カテゴリが取れないと分類を選べないため、全体エラーとして知らせる
                setSubmitError('分類の取得に失敗しました。')
            }
        }
        fetchCategories()
    }, [])

    /**
     * 登録ボタン押下時の処理。
     * クライアント側で検証 → 問題なければ送信 → サーバーエラーがあれば反映
     */
    const submit = async () => {
        // 前回の送信結果をリセットする
        setSubmitError(null)
        setSuccess(false)

        // 文字列で持っていた蔵書数を数値に変換する。
        // 空文字は Number('') が 0 になってしまうため、明示的に NaN にして検証で弾く。
        const stockNumber = stock === '' ? NaN : Number(stock)

        // APIへ送る形(リクエスト)に組み立てる
        const request: BookRegisterRequest = {
            title,
            author,
            categoryId,
            stock: stockNumber,
        }

        // --- ① クライアント側バリデーション ---
        // 送信前にブラウザ側で検証し、無駄な通信を減らして即座にフィードバックする。
        const clientErrors = validateBookForm(request)
        if (Object.keys(clientErrors).length > 0) {
            // エラーがあれば各項目に表示し、送信せずに終了する
            setErrors(clientErrors)
            return
        }
        // 検証を通過したら、前回のエラー表示をクリアする
        setErrors({})

        // --- ② API送信 ---
        setSubmitting(true)
        try {
            const service = container.get<IBookService>(TYPES.BookService)
            await service.register(request)

            // 登録成功:成功フラグを立て、入力欄を初期状態に戻す
            setSuccess(true)
            setTitle('')
            setAuthor('')
            setCategoryId('')
            setStock('')
        } catch (e) {
            // --- ③ サーバー側バリデーションエラー(400)の反映 ---
            // クライアント検証をすり抜けても、サーバーが最終的に検証
            // 400の場合はValidationErrorとして届くので、各項目のエラーに変換して表示
            if (e instanceof ValidationError) {
                setErrors(mapServerErrors(e.errors))
            } else {
                // それ以外(通信失敗・サーバー障害など)は全体エラーとして扱う
                setSubmitError('登録中にエラーが発生しました。しばらくしてからお試しください。')
            }
        } finally {
            // 成功・失敗にかかわらず、送信中フラグは必ずOffにする
            setSubmitting(false)
        }
  }

    // 画面が必要とする状態と操作だけを公開する
    return {
        title, setTitle,
        author, setAuthor,
        categoryId, setCategoryId,
        stock, setStock,
        categories,
        errors,
        submitting,
        submitError,
        success,
        submit,
    }
}

/**
 * サーバーが返すバリデーションエラーを、画面で扱いやすい形に変換する
 *
 * サーバー(ASP.NET Core)側のキーは C# のプロパティ名に対応して先頭大文字
 * 例: { Title: ['書名は1~50文字で入力してください'] } → { title: '書名は1~50文字で入力してください' }
 */
function mapServerErrors(serverErrors: Record<string, string[]>): BookFormErrors {
    const result: BookFormErrors = {}

    // サーバーのキー(先頭大文字) → 画面のキー(小文字)の対応表
    const keyMap: Record<string, keyof BookFormErrors> = {
        Title: 'title',
        Author: 'author',
        CategoryId: 'categoryId',
        Stock: 'stock',
    }

    for (const [serverKey, messages] of Object.entries(serverErrors)) {
        const key = keyMap[serverKey]
        // 対応表にあるキーで、かつメッセージが存在する場合のみ反映する
        if (key && messages.length > 0) {
            result[key] = messages[0] // 同じ項目に複数あれば、代表として先頭の1件を表示
        }
    }

    return result
}