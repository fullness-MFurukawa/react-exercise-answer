import { BookRegisterRequest } from "@/models/BookRegisterRequest"


/** フィールド名 → エラーメッセージ(1件)の形 */
export type BookFormErrors = Partial<Record<keyof BookRegisterRequest, string>>

/**
 * 図書登録フォームの入力チェック
 * @returns エラーがあれば各フィールドのメッセージ、なければ空オブジェクト
 */
export function validateBookForm(input: BookRegisterRequest): BookFormErrors {
    const errors: BookFormErrors = {}

    // 書名:1~50文字
    if (input.title.length < 1 || input.title.length > 50) {
        errors.title = '書名は1~50文字で入力してください'
    }

    // 著者名:1~30文字
    if (input.author.length < 1 || input.author.length > 30) {
        errors.author = '著者名は1~30文字で入力してください'
    }

    // 分類:必須(未選択は空文字)
    if (!input.categoryId) {
        errors.categoryId = '分類を選択してください'
    }

    // 蔵書数:0以上の整数
    if (!Number.isInteger(input.stock) || input.stock < 0) {
        errors.stock = '蔵書数は0以上の整数で入力してください'
    }

    return errors
}