import { Container } from 'inversify'
import { TYPES } from './types'
import type { ICategoryRepository } from '@/interfaces/ICategoryRepository'
import { CategoryRepository } from '@/infrastructures/CategoryRepository'
import { ICategoryService } from '@/interfaces/ICategoryService'
import { CategoryService } from '@/services/CategoryService'

/** DI コンテナ(全体で1つだけ使い回す) */
const container = new Container()

container
    .bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository)
container
    .bind<ICategoryService>(TYPES.CategoryService).to(CategoryService)

export { container }