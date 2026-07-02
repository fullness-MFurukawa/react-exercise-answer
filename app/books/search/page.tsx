'use client'

import { useBookSearch } from '@/hooks/useBookSearch'
import { BookSearchForm } from '@/components/books/search/BookSearchForm'
import { BookSearchResult } from '@/components/books/search/BookSearchResult'

export default function BookSearchPage() {
  // フックから状態とロジックを取得する
  const { keyword, setKeyword, books, loading, searched, search } =
    useBookSearch()

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">図書検索</h1>
      <p className="mt-2 text-muted-foreground">
        書名のキーワードを入力して検索してください。
      </p>
      
      {/* フックの状態をコンポーネントに渡す */}
      <BookSearchForm
        keyword={keyword}
        loading={loading}
        onKeywordChange={setKeyword}
        onSearch={search}
      />
      <BookSearchResult
        books={books}
        loading={loading}
        searched={searched}
      />
    </div>
  )
}