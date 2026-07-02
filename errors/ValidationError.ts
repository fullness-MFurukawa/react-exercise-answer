import { ValidationProblem } from "@/models/ValidationProblem"
/**
 * サーバー側バリデーション(400)専用のエラー
 * 通常のエラーと区別し、フィールドごとのメッセージを保持する
 */
export class ValidationError extends Error {
    /** フィールド名 → メッセージ配列 */
    readonly errors: Record<string, string[]>
    /**
     * コンストラクタ
     * @param problem 
     */
    constructor(problem: ValidationProblem) {
        super(problem.title ?? 'バリデーションエラー')
        this.name = 'ValidationError'
        this.errors = problem.errors
    }
}