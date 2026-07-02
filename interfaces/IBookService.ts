import type { Book } from '@/models/book'
import { BookRegisterRequest } from '@/models/BookRegisterRequest'

export interface IBookService {
    /**
     * キーワードで書籍を検索する
     * @param keyword 検索キーワード
     * @returns 該当する書籍の配列
     */
    search(keyword: string): Promise<Book[]>

    /**
     * 書籍を登録する
     * @param request 登録内容
     * @returns 登録された書籍
     * @throws ValidationError サーバーが400(検証エラー)を返した場合
     */
    register(request: BookRegisterRequest): Promise<Book>
}