/**
 * カテゴリを表すモデル
 * GET /proxy-api/categories のレスポンス1件分に対応する
 */
export interface Category {
  /** カテゴリの一意な ID（UUID 形式） */
  categoryId: string
  /** カテゴリ名（例: 技術書、小説 など） */
  name: string
}