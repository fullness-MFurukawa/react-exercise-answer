import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { CategoryRepository } from '../../infrastructures/CategoryRepository'
import type { Category } from '@/models/category'

/**
 * CategoryRepositoryの単体テストドライバ
 */
describe('CategoryRepository', () => {
    let repository: CategoryRepository

    // テストの前処理
    beforeEach(() => {
        repository = new CategoryRepository()
    })

    // テストの後処理
    afterEach(() => {
        // 各テストごとにfetchのモックを元に戻す
        vi.unstubAllGlobals()
    })

    /**
     * テストケース-1
     */
    it('getAll: 正常時はカテゴリ配列を返す', async () => {
        // テストデータを用意する
        const mockCategories: Category[] = [
            { categoryId: '18836923-5194-47f1-bf4c-e09eb5fa8fef', name: '技術書' },
            { categoryId: '1c7dc46b-5618-4d9b-ad4a-0a805e7032d6', name: '小説' },
        ]

        // fetchを差し替え。ok=trueで、json()がモックデータを返すようにする
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockCategories,
        })
        vi.stubGlobal('fetch', fetchMock)

        const result = await repository.getAll()

        // 期待する配列が返ることを評価
        expect(result).toEqual(mockCategories)
        // 正しいエンドポイントを、1回だけ実行されたことを評価
        expect(fetchMock).toHaveBeenCalledWith('/proxy-api/categories')
        expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    it('getAll: 失敗時(ok=false)は例外を投げる', async () => {
        // ok=false, status=500を返すようにする
        const fetchMock = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            json: async () => ({}),
        })
        vi.stubGlobal('fetch', fetchMock)

        // 例外メッセージにstatusが含まれることまで検証
        await expect(repository.getAll())
            .rejects.toThrow('カテゴリの取得に失敗しました (status: 500)'
        )
    })
})