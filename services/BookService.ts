import { injectable, inject } from 'inversify'
import type { Book } from '@/models/book'
import type { IBookService } from '@/interfaces/IBookService'
import type { IBookRepository } from '@/interfaces/IBookRepository'
import { TYPES } from '@/di/types'

/**
 * IBookServiceインターフェイス実装
 */
@injectable()
export class BookService implements IBookService {
    constructor(
        @inject(TYPES.BookRepository)
        private readonly bookRepository: IBookRepository
    ) {}

    async search(keyword: string): Promise<Book[]> {
        return this.bookRepository.search(keyword)
    }
}