/**
 * 図書登録APIへ送るリクエストの型
 * POST:/proxy-api/booksのボディに対応する
 */
export interface BookRegisterRequest {
    title: string       //　タイトル
    author: string      //  著者
    categoryId: string  //  カテゴリId
    stock: number       //  在庫数
}