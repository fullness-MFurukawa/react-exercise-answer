// hooks/useBookSearch.ts
import { useState } from 'react'
import { container } from '@/di/container'
import { TYPES } from '@/di/types'
import type { IBookService } from '@/interfaces/IBookService'
import type { Book } from '@/models/book'

/**
 * 図書検索の状態とロジックを管理するカスタムフック
 */
export function useBookSearch() {
    const [keyword, setKeyword] = useState('')
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    // 一度でも検索を実行したか(初期表示と「0件」を区別する
    const [searched, setSearched] = useState(false)

    const search = async () => {

        // 入力チェック:空(または空白のみ)なら API を呼ばずに案内を出す
        if (!keyword.trim()) {
            setError('検索キーワードを入力してください。')
            setBooks([])
            setSearched(false) // 「0件」ではなく「未検索」扱いにする
            return
        }

        setLoading(true)
        setError(null)
        try {
            const service = container.get<IBookService>(TYPES.BookService)
            const result = await service.search(keyword)
            setBooks(result)
        } catch (e) {
            setError(e instanceof Error ? e.message : '不明なエラーが発生しました')
            setBooks([])
        } finally {
            setLoading(false)
            setSearched(true)
        }
    }

    // 画面が必要とする状態と操作だけを公開する
    return {
        keyword,
        setKeyword,
        books,
        loading,
        error,
        searched,
        search,
    }
}