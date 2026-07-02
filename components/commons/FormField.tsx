import { CircleAlert } from 'lucide-react'
/**
 * FormField コンポーネントのProps
 */
type Props = {
    /** 項目のラベル(例: 「書名」「著者名」) */
    label: string
    /** 必須項目かどうか。true の場合、ラベルの右に赤い「*」を表示する */
    required?: boolean
    /**
     * この項目の検証エラーメッセージ
     * 値がある場合のみ、入力欄の下に赤字で表示される
     * undefined(エラーなし)のときは何も表示しない
     */
    error?: string
    /**
     * 実際の入力要素(Input / Select / Textarea など)
     * ラベルとエラー表示の「間」に差し込まれる
     * この部品自体は入力欄の種類を問わず、外から受け取った要素をそのまま表示する
     */
    children: React.ReactNode
}

/**
 * フォームの1項目分の「ラベル + 入力欄 + エラーメッセージ」をまとめて表示する共通部品
 *
 * 入力欄そのものは childrenとして外から受け取るため、
 * テキスト入力・セレクト・数値入力など、あらゆる入力部品に対して使い回せる
 * 各フォームでラベルやエラー表示のマークアップを繰り返し書かずに済む
 *
 * @example
 * <FormField label="書名" required error={errors.title}>
 *   <Input value={title} onChange={...} aria-invalid={!!errors.title} />
 * </FormField>
 */
export function FormField({ label, required, error, children }: Props) {
    return (
        <div className="space-y-1.5">
            {/* ラベル部分。必須項目なら赤い「*」を添える */}
            <label className="text-sm font-medium">
                {label}
                {required && <span className="ml-0.5 text-destructive">*</span>}
            </label>

            {/* 入力要素(呼び出し側から渡されたものをそのまま配置) */}
            {children}

            {/* エラーメッセージ、error が渡されたときだけ、アイコン付きで赤字表示する */}
            {error && (
                <p className="flex items-center gap-1 text-sm text-destructive">
                    <CircleAlert className="h-4 w-4" />
                    {error}
                </p>
            )}
        </div>
    )
}