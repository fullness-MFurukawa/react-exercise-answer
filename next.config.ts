import type { NextConfig } from "next";

/**
 * プロキシ設定
 */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      /**
       * カテゴリ一覧用
       */
      {
        source: '/proxy-api/categories/:path*',
        destination: 'http://20.78.35.126/app2/library/api/categories/:path*',
      },
      /**
       * 書籍アクセス用
       */
      {
        source: '/proxy-api/books/:path*',
        destination: 'http://20.78.35.126/app2/library/api/books/:path*',
      },
    ]}
};

export default nextConfig;
