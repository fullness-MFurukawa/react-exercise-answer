import type { Book } from '@/models/book'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { SearchX } from 'lucide-react'

type Props = {
  books: Book[]
  loading: boolean
  searched: boolean
}

export function BookSearchResult({ books, loading, searched }: Props) {
  // 検索実行後、0件だった場合のメッセージ(結果に紐づくので画面に残す)
  if (searched && !loading && books.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center gap-2 text-muted-foreground">
        <SearchX className="h-10 w-10" />
        <p>該当する図書が見つかりませんでした。</p>
      </div>
    )
  }

  if (books.length === 0) {
    return null
  }

  return (
    <Table className="mt-6">
      <TableHeader>
        <TableRow>
          <TableHead>書名</TableHead>
          <TableHead>著者</TableHead>
          <TableHead>カテゴリ</TableHead>
          <TableHead className="text-right">在庫</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow key={book.bookId}>
            <TableCell className="font-medium">{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.category.name}</TableCell>
            <TableCell className="text-right">{book.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}