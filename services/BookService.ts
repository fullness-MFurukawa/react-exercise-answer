import { injectable, inject } from 'inversify'
import type { Book } from '@/models/book'
import type { IBookService } from '@/interfaces/IBookService'
import type { IBookRepository } from '@/interfaces/IBookRepository'
import { TYPES } from '@/di/types'
import { BookRegisterRequest } from '@/models/BookRegisterRequest'

/**
 * IBookServiceインターフェイス実装
 */
@injectable()
export class BookService implements IBookService {
    constructor(
        @inject(TYPES.BookRepository)
        private readonly bookRepository: IBookRepository
    ) {}

    /**
     * キーワードで書籍を検索する
     * @param keyword 検索キーワード
     * @returns 該当する書籍の配列
     */
    async search(keyword: string): Promise<Book[]> {
        return this.bookRepository.search(keyword)
    }

    /**
     * 書籍を登録する
     * @param request 登録内容
     * @returns 登録された書籍
     * @throws ValidationError サーバーが400(検証エラー)を返した場合
     */
    async register(request: BookRegisterRequest): Promise<Book> {
        return this.bookRepository.register(request)
    }
}