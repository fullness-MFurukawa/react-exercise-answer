import { useState } from 'react'
import { toast } from 'sonner'
import { container } from '@/di/container'
import { TYPES } from '@/di/types'
import type { IBookService } from '@/interfaces/IBookService'
import type { Book } from '@/models/book'

export function useBookSearch() {
    const [keyword, setKeyword] = useState('')
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(false)

    const search = async () => {
        if (!keyword.trim()) {
            toast.warning('検索キーワードを入力してください。',{ id: 'search-empty' })
            setBooks([])
            setSearched(false)
        return
        }

        setLoading(true)
        try {
            const service = container.get<IBookService>(TYPES.BookService)
            const result = await service.search(keyword)
            setBooks(result)
        } catch (e) {
            console.error('書籍検索エラー:', e)
            toast.error('検索中にエラーが発生しました。')
            setBooks([])
        } finally {
            setLoading(false)
            setSearched(true)
        }
    }

    return { keyword, setKeyword, books, loading, searched, search }
}