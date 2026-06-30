import type { Category } from '@/models/category'
/**
 * カテゴリに関する業務ロジックの契約(インターフェイス)
 * 画面(コンポーネント)はこの契約だけを知っていればよい
 */
export interface ICategoryService {
    /**
     * カテゴリ一覧を取得する
     * @returns カテゴリの配列
    */
    getAll(): Promise<Category[]>
}