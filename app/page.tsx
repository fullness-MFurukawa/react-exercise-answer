import Link from 'next/link'
import { Search, Plus, SquarePen, Trash2, type LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'

/** メニュー1項目の型 */
type MenuItem = {
  href: string
  title: string
  description: string
  icon: LucideIcon
  tone: 'blue' | 'red'
}

/** メニュー項目の定義 */
const menuItems: MenuItem[] = [
  {
    href: '/books/search',
    title: '図書検索',
    description: '書名のキーワードで蔵書を検索します。',
    icon: Search,
    tone: 'blue',
  },
  {
    href: '/books/register',
    title: '図書登録',
    description: '新しい図書を蔵書に登録します。',
    icon: Plus,
    tone: 'blue',
  },
  {
    href: '/books/edit',
    title: '図書変更',
    description: '検索して選んだ図書の情報を変更します。',
    icon: SquarePen,
    tone: 'blue',
  },
  {
    href: '/books/delete',
    title: '図書削除',
    description: '検索して選んだ図書を蔵書から削除します。',
    icon: Trash2,
    tone: 'red',
  },
]

/** アイコン背景の色味(青系 / 赤系) */
const toneStyles: Record<MenuItem['tone'], string> = {
  blue: 'bg-blue-50 text-blue-600',
  red: 'bg-red-50 text-red-600',
}

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">メニュー</h1>
      <p className="mt-2 text-muted-foreground">利用する機能を選択してください。</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Card className="flex flex-row items-start gap-4 p-5 transition-colors hover:border-slate-400 hover:bg-slate-50">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${toneStyles[item.tone]}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}