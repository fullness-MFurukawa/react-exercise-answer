import { Container } from 'inversify'
import { TYPES } from './types'
import type { ICategoryRepository } from '@/interfaces/ICategoryRepository'
import { CategoryRepository } from '@/infrastructures/CategoryRepository'
import { ICategoryService } from '@/interfaces/ICategoryService'
import { CategoryService } from '@/services/CategoryService'
import { IBookRepository } from '@/interfaces/IBookRepository'
import { IBookService } from '@/interfaces/IBookService'
import { BookRepository } from '@/infrastructures/BookRepository'
import { BookService } from '@/services/BookService'

/** DI コンテナ(全体で1つだけ使い回す) */
const container = new Container()

container
    .bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository)
container
    .bind<ICategoryService>(TYPES.CategoryService).to(CategoryService)
container
    .bind<IBookRepository>(TYPES.BookRepository).to(BookRepository)
container
    .bind<IBookService>(TYPES.BookService).to(BookService)
export { container }