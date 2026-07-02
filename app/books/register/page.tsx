'use client'
import { useRouter } from 'next/navigation'
import { useBookRegister } from '@/hooks/useBookRegister'
import { BookRegisterForm } from '@/components/books/register/BookRegisterForm'

/**
 * 図書登録ページ
 * フック(useBookRegister)から状態とロジックを受け取り、
 * それをフォームコンポーネントに配置するだけのコンポーネント
 * ロジックも見た目の詳細もここには書かない
 */
export default function BookRegisterPage() {
    const router = useRouter()

    // フックから状態と操作をまとめて受け取る
    const form = useBookRegister()

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight">図書登録</h1>

            {/* 登録成功時のメッセージ */}
            {form.success && (
                <p className="mt-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
                    図書を登録しました。
                </p>
            )}

            {/* 項目に紐づかない全体エラー(通信失敗・カテゴリ取得失敗など) */}
            {form.submitError && (
                <p className="mt-4 text-sm text-destructive">{form.submitError}</p>
            )}

            {/* フックの状態をフォームコンポーネントに渡す */}
            <BookRegisterForm
                title={form.title}
                author={form.author}
                categoryId={form.categoryId}
                stock={form.stock}
                categories={form.categories}
                errors={form.errors}
                submitting={form.submitting}
                onTitleChange={form.setTitle}
                onAuthorChange={form.setAuthor}
                onCategoryChange={form.setCategoryId}
                onStockChange={form.setStock}
                onSubmit={form.submit}
                onCancel={() => router.push('/')}
            />
        </div>
    )
}