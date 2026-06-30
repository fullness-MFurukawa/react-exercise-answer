import type { Category } from '@/models/category'

/**
 * カテゴリのデータ取得に関する契約(インターフェイス)
 */
export interface ICategoryRepository {
    /**
     * カテゴリ一覧を取得する
     * @returns カテゴリの配列
    */
    getAll(): Promise<Category[]>
}