# TanStack Router プロジェクト

このプロジェクトは、React 19 + TypeScript + TanStack Router + Vite + Bunを使用したモダンなフロントエンドアプリケーションです。

## 技術スタック

- **React 19** - UIライブラリ
- **TypeScript** - 型安全なJavaScript
- **TanStack Router** - 型安全なファイルベースルーティング
- **Vite** - 高速なビルドツール
- **Bun** - 高速なJavaScriptランタイム・パッケージマネージャー

## TanStack Routerの特徴

- **型安全性**: TypeScriptと完全に統合された型安全なルーティング
- **ファイルベースルーティング**: ファイル構造に基づく自動ルート生成
- **データローダー**: ページ遷移前のデータプリフェッチ
- **検索パラメータ管理**: URLの検索パラメータを型安全に管理
- **レイアウトシステム**: ネストしたレイアウトのサポート

## ディレクトリ構成

以下のディレクトリ構成を推奨します：

```
src/
├── routes/                    # ルート定義（ファイルベースルーティング）
│   ├── __root.tsx            # ルートレイアウト
│   ├── index.tsx             # ホームページ（/）
│   ├── about/                # Aboutページ関連
│   │   ├── index.tsx         # /about ルート定義
│   │   └── components/       # Aboutページ専用コンポーネント
│   │       ├── Hero.tsx
│   │       └── Features.tsx
│   ├── posts/                # 投稿ページ関連
│   │   ├── index.tsx         # /posts 一覧ページ
│   │   ├── $postId.tsx       # /posts/:postId 詳細ページ
│   │   └── components/       # 投稿ページ専用コンポーネント
│   └── _auth/                # 認証が必要なページ
│       ├── dashboard.tsx     # /dashboard
│       └── settings.tsx      # /settings
├── components/               # アプリ全体で共有するコンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Button.tsx
├── hooks/                    # カスタムフック
├── utils/                    # ユーティリティ関数
└── routeTree.gen.ts         # 自動生成（編集禁止）
```

## ファイル命名規則

- **基本ルート**: `index.tsx` → `/`、`about.tsx` → `/about`
- **動的ルート**: `$postId.tsx` → `/posts/:postId`、`$userId.tsx` → `/users/:userId`
- **レイアウトルート**: `_auth.tsx` → 認証レイアウト（URLに影響なし）
- **ネストしたルート**: `about/team.tsx` → `/about/team`

## ファイルの書き方

### 基本的なルート定義

```tsx
// routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

function About() {
  return <div>About Page</div>
}

export const Route = createFileRoute('/about')({
  component: About,
})
```

### ディレクトリ形式のルート定義（Co-locationパターン）

```tsx
// routes/about/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Hero } from './components/Hero'
import { Features } from './components/Features'

function About() {
  return (
    <div>
      <Hero />
      <Features />
    </div>
  )
}

export const Route = createFileRoute('/about')({
  component: About,
})
```

### 動的ルート

```tsx
// routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

function PostDetail() {
  const { postId } = Route.useParams()
  return <div>Post ID: {postId}</div>
}

export const Route = createFileRoute('/posts/$postId')({
  component: PostDetail,
})
```

### データローダー付きルート

```tsx
// routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  component: PostDetail,
})

function PostDetail() {
  const { post } = Route.useLoaderData()
  return <div>{post.title}</div>
}
```

## TanStack Queryとの統合（予定）

TanStack QueryとTanStack Routerを組み合わせることで、型安全なデータフェッチングとルーティングを実現します。

### 推奨パターン: Loader + useQuery

```tsx
// routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'
import { queryOptions, useQuery } from '@tanstack/react-query'

// クエリオプションを定義
const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${postId}`)
      return res.json()
    },
  })

// Loaderでデータをプリフェッチ
export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(postQueryOptions(params.postId)),
  component: PostDetail,
})

function PostDetail() {
  const { postId } = Route.useParams()
  // コンポーネント内でuseQueryを使用（キャッシュから取得）
  const { data: post } = useQuery(postQueryOptions(postId))
  
  return <div>{post.title}</div>
}
```

**メリット:**
- Loaderでデータをプリフェッチし、ページ遷移を高速化
- コンポーネント内で`useQuery`を使い、リアルタイム更新やrefetchが可能
- キャッシュを共有し、無駄なリクエストを削減

## ベストプラクティス

- **Co-location**: ページ固有のコンポーネントは`routes/{page}/components/`に配置
- **共有コンポーネント**: 複数ページで使うものは`src/components/`に配置
- **型安全性**: `Route.useParams()`、`Route.useLoaderData()`で型推論を活用
- **routeTree.gen.ts**: 自動生成ファイルはGitにコミット、編集禁止

## 開発フロー

- **新しいページ追加**: `src/routes/`に適切なファイルを作成
- **ホットリロード**: `routeTree.gen.ts`が自動更新され、即座に反映
- **DevTools**: 開発環境では画面下部にTanStack Router DevToolsが表示

## よく使うパターン

- **ナビゲーション**: `<Link to="/about">`
- **プログラマティックナビゲーション**: `navigate({ to: '/posts' })`
- **Search Params**: `Route.useSearch()`
- **レイアウト共有**: `_auth.tsx`でラップ
- **パラメータ取得**: `Route.useParams()`
- **ローダーデータ取得**: `Route.useLoaderData()`

## 開発コマンド

```bash
# 開発サーバー起動
bun run dev

# ビルド
bun run build

# プレビュー
bun run preview
```

## 参考リンク

- [TanStack Router公式ドキュメント](https://tanstack.com/router)
- [TanStack Query公式ドキュメント](https://tanstack.com/query)
- [Vite公式ドキュメント](https://vitejs.dev/)
