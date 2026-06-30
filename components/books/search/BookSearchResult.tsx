import type { Book } from '@/models/book'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Props = {
  books: Book[]
  loading: boolean
  error: string | null
  searched: boolean
}

export function BookSearchResult({ books, loading, error, searched }: Props) {
  // エラー時
  if (error) {
    return <p className="mt-6 text-destructive">エラー: {error}</p>
  }

  // 検索実行後、0件だった場合のメッセージ
  if (searched && !loading && books.length === 0) {
    return (
      <p className="mt-6 text-muted-foreground">
        該当する図書が見つかりませんでした。
      </p>
    )
  }

  // 結果がなければ何も表示しない(初期表示など)
  if (books.length === 0) {
    return null
  }

  // 検索結果テーブル
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