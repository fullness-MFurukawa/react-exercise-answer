import type { Category } from '@/models/category'

/**
 * 書籍を表すモデル
 * GET /proxy-api/booksのレスポンス1件分に対応する
 */
export interface Book {
    /** 書籍の一意なID（UUID 形式） */
    bookId: string
    /** 書名 */
    title: string
    /** 著者名 */
    author: string
    /** カテゴリ */
    category: Category
    /** 在庫数 */
    stock: number
}