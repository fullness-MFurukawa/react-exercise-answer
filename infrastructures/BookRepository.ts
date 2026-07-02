import { injectable } from 'inversify'
import type { Book } from '@/models/book'
import type { IBookRepository } from '@/interfaces/IBookRepository'
import { BookRegisterRequest } from '@/models/BookRegisterRequest'
import { ValidationProblem } from '@/models/ValidationProblem'
import { ValidationError } from '@/errors/ValidationError'

/**
 * IBookRepositoryインターフェイスの実装クラス
 * Next.jsのプロキシ経由で書籍APIを呼び出す
 */
@injectable()
export class BookRepository implements IBookRepository {
    private readonly endpoint = '/proxy-api/books'

    /**
     * キーワードで書籍を検索する
     * @param keyword 書名に含まれるキーワード
     * @returns 該当する書籍の配列(0件の場合は空配列)
     */
    async search(keyword: string): Promise<Book[]> {
        // URLSearchParams がキーワードを自動で URL エンコードしてくれる
        const params = new URLSearchParams({ Keyword: keyword })
        const res = await fetch(`${this.endpoint}?${params.toString()}`)

        if (!res.ok) {
            throw new Error(`書籍の検索に失敗しました (status: ${res.status})`)
        }
        return (await res.json()) as Book[]
    }

    /**
     * 書籍を登録する
     * @param request 登録内容
     * @returns 登録された書籍
     * @throws ValidationError サーバーが400(検証エラー)を返した場合
     */
    async register(request: BookRegisterRequest): Promise<Book> {
        const res = await fetch(this.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        })

        // サーバー側バリデーションエラー(400)はメッセージを取り出して専用エラーにする
        if (res.status === 400) {
            const problem = (await res.json()) as ValidationProblem
            throw new ValidationError(problem)
        }

        if (!res.ok) {
            throw new Error(`書籍の登録に失敗しました (status: ${res.status})`)
        }

        return (await res.json()) as Book
    }
}