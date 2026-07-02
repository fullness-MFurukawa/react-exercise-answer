import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

/**
 * メニュー(ホーム)に戻る共通リンク
 *
 * 各機能ページ(検索・変更・削除など)の先頭に置いて、トップページ(/)へ戻る導線を統一する
 * next/link を使うため、ページ全体を再読み込みせずに素早く遷移する
 * @example
 * <BackToMenuLink />
 */
export function BackToMenuLink() {
    return (
        <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="mr-1 h-4 w-4" />
            メニューに戻る
        </Link>
    )
}