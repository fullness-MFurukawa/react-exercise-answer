import type { Metadata } from 'next'
import { Library, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import './globals.css'

export const metadata: Metadata = {
  title: '図書管理システム',
  description: '蔵書の検索・登録・変更・削除を行う図書管理システム',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="bg-stone-100 antialiased">
        <div className="mx-auto max-w-5xl p-4 md:p-8">
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            {/* 全ページ共通ヘッダー */}
            <header className="flex items-center justify-between bg-slate-800 px-6 py-4 text-white">
              <div className="flex items-center gap-2">
                <Library className="h-6 w-6" />
                <span className="text-lg font-semibold">図書管理システム</span>
              </div>
              <Button
                variant="outline"
                className="border-slate-500 bg-transparent text-white hover:bg-slate-700 hover:text-white"
              >
                <LogOut className="mr-1 h-4 w-4" />
                ログアウト
              </Button>
            </header>

            {/* 各ページの中身がここに差し込まれる */}
            <main className="p-6 md:p-10">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}