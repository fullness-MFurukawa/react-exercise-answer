/**
 * ASP.NET Coreが返す検証エラー(ProblemDetails / RFC 9110)の型
 * errors:「フィールド名 → メッセージ配列」の形式
 */
export interface ValidationProblem {
    type?: string
    title?: string
    status?: number
    errors: Record<string, string[]>
    traceId?: string
}