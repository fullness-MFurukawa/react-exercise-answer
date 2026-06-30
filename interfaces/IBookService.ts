import type { Book } from '@/models/book'

export interface IBookService {
    /**
     * キーワードで書籍を検索する
     * @param keyword 検索キーワード
     * @returns 該当する書籍の配列
     */
    search(keyword: string): Promise<Book[]>
}