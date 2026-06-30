// services/CategoryService.ts
import { injectable, inject } from 'inversify'
import type { Category } from '@/models/category'
import type { ICategoryService } from '@/interfaces/ICategoryService'
import type { ICategoryRepository } from '@/interfaces/ICategoryRepository'
import { TYPES } from '@/di/types'

/**
 * ICategoryServiceインターフェイスの実装クラス
 * Repositoryからデータを取得し、業務ロジックを担う層
 */
@injectable()
export class CategoryService implements ICategoryService {
    /**
     * コンストラクタで ICategoryRepository を注入してもらう
     */
    constructor(
        @inject(TYPES.CategoryRepository)
        private readonly categoryRepository: ICategoryRepository
    ) {}

    async getAll(): Promise<Category[]> {
        return this.categoryRepository.getAll()
    }
}