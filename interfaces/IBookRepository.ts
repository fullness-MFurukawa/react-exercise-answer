import type { Book } from '@/models/book'
/**
 * 書籍のデータ取得に関する契約(インターフェイス)
 */
export interface IBookRepository {
    /**
     * キーワードで書籍を検索する
     * @param keyword 書名に含まれるキーワード
     * @returns 該当する書籍の配列(0件の場合は空配列)
     */
    search(keyword: string): Promise<Book[]>
}