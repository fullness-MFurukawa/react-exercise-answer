import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  keyword: string
  loading: boolean
  onKeywordChange: (value: string) => void
  onSearch: () => void
}

export function BookSearchForm({
  keyword,
  loading,
  onKeywordChange,
  onSearch,
}: Props) {
  return (
    <div className="mt-6 flex gap-2">
      <Input
        placeholder="書名のキーワード"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch()
        }}
      />
      <Button onClick={onSearch} disabled={loading}>
        {loading ? '検索中...' : '検索'}
      </Button>
    </div>
  )
}