import { injectable } from 'inversify'
import type { Book } from '@/models/book'
import type { IBookRepository } from '@/interfaces/IBookRepository'

/**
 * IBookRepositoryインターフェイスの実装クラス
 * Next.jsのプロキシ経由で書籍 API を呼び出す
 */
@injectable()
export class BookRepository implements IBookRepository {
    private readonly endpoint = '/proxy-api/books'

    async search(keyword: string): Promise<Book[]> {
        // URLSearchParams がキーワードを自動で URL エンコードしてくれる
        const params = new URLSearchParams({ Keyword: keyword })
        const res = await fetch(`${this.endpoint}?${params.toString()}`)

        if (!res.ok) {
            throw new Error(`書籍の検索に失敗しました (status: ${res.status})`)
        }
        return (await res.json()) as Book[]
    }
}