import type { Category } from '@/models/category'
import type { ICategoryRepository } from '@/interfaces/ICategoryRepository'
import { injectable } from 'inversify'
/**
 * ICategoryRepositoryインターフェイスの実装クラス
 * Next.jsのプロキシ(/proxy-api/categories)経由で
 * バックエンドAPIからカテゴリを取得する
 */
@injectable()
export class CategoryRepository implements ICategoryRepository {
    /** プロキシ経由のエンドポイント */
    private readonly endpoint = '/proxy-api/categories'

    async getAll(): Promise<Category[]> {
        const res = await fetch(this.endpoint)

        if (!res.ok) {
        throw new Error(`カテゴリの取得に失敗しました (status: ${res.status})`)
        }

        const data: Category[] = await res.json()
        return data
    }
}