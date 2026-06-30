/**
 * DIコンテナで使うサービス識別子
 * interfaceは実行時に消えるため、その代わりとなる目印をSymbolで用意する
 */
export const TYPES = {
    CategoryRepository: Symbol.for('CategoryRepository'),
    CategoryService: Symbol.for('CategoryService'),
    BookRepository: Symbol.for('BookRepository'), 
    BookService: Symbol.for('BookService'),       
} as const