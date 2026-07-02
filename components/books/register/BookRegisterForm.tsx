import { Save } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormField } from '@/components/commons/FormField'
import type { Category } from '@/models/category'
import type { BookFormErrors } from '@/lib/validateBookForm'

/**
 * BookRegisterFormコンポーネントのProps
 *
 * 入力値・選択肢・エラー・送信状態はすべて外(フック)から受け取り、
 * 入力操作はイベントで親に通知する
 * このコンポーネント自身は状態を持たず、「見た目」だけに責任を持つ
 */
type Props = {
    // --- 入力値 ---
    title: string
    author: string
    categoryId: string
    stock: string
    // --- 選択肢・状態 ---
    categories: Category[]      // 分類セレクトの選択肢
    errors: BookFormErrors      // 項目ごとの検証エラー(あれば各欄に表示)
    submitting: boolean         // 送信中フラグ(ボタンの無効化・ラベル切替に使う)
    // --- 入力操作の通知 ---
    onTitleChange: (v: string) => void
    onAuthorChange: (v: string) => void
    onCategoryChange: (v: string) => void
    onStockChange: (v: string) => void
    // --- ボタン操作の通知 ---
    onSubmit: () => void
    onCancel: () => void
}

/**
 * 図書登録フォームコンポーネント
 * 各入力項目を共通部品のFormFieldを使用し、ラベル・必須マーク・エラー表示を統一する
 * 入力欄がエラーのときはaria-invalidを付けることで、shadcn/ui側が枠を赤く描画する
 */
export function BookRegisterForm({
    title, author, categoryId, stock,
    categories, errors, submitting,
    onTitleChange, onAuthorChange, onCategoryChange, onStockChange,
    onSubmit, onCancel,
}: Props) {
    return (
        <div className="mt-6 space-y-5">
            {/* 書名:テキスト入力 */}
            <FormField label="書名" required error={errors.title}>
                <Input
                    placeholder="例:プログラミング入門"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    aria-invalid={!!errors.title}
                />
            </FormField>

            {/* 著者名:テキスト入力 */}
            <FormField label="著者名" required error={errors.author}>
                <Input
                    value={author}
                    onChange={(e) => onAuthorChange(e.target.value)}
                    aria-invalid={!!errors.author}
                />
            </FormField>

            {/* 分類:カテゴリ一覧から選択、表示は名前、値(value)はカテゴリID */}
            <FormField label="分類" required error={errors.categoryId}>
                <Select value={categoryId} onValueChange={onCategoryChange}>
                    <SelectTrigger aria-invalid={!!errors.categoryId} className="w-full">
                        <SelectValue placeholder="分類を選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((c) => (
                            <SelectItem key={c.categoryId} value={c.categoryId}>
                            {c.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormField>

            {/* 蔵書数:数値入力、値は文字列で扱い、送信時に数値へ変換される(フック側) */}
            <FormField label="蔵書数" required error={errors.stock}>
                <Input
                    type="number"
                    value={stock}
                    onChange={(e) => onStockChange(e.target.value)}
                    aria-invalid={!!errors.stock}
                    className="w-40"
                />
            </FormField>

            {/* 操作ボタン:登録(主ボタン)とキャンセル */}
            <div className="flex gap-3 pt-2">
                <Button
                    onClick={onSubmit}
                    disabled={submitting}
                    className="flex-1 md:flex-none md:min-w-60"
                >
                    <Save className="mr-1 h-4 w-4" />
                        {submitting ? '登録中...' : '登録'}
                </Button>
                <Button variant="outline" onClick={onCancel} disabled={submitting}>
                    キャンセル
                </Button>
            </div>
        </div>
    )
}