# lingo

## プロジェクト構造

```
/app
├── .devcontainer/          # Dev Container設定
│   ├── devcontainer.json   # VS Code Dev Container設定
│   ├── docker-compose.yml  # Docker Compose設定
│   └── Dockerfile         # 開発環境用Dockerfile
├── .mise.toml             # タスクランナー設定
├── backend/               # バックエンドアプリケーション
├── frontend/              # フロントエンドアプリケーション
├── env.example            # 環境変数テンプレート
└── README.md              # このファイル
```

## 開発環境のセットアップ

### Dev Containerを使用した開発
vscode拡張機能をインストールする必要あります。

1. **Dev Containerを開く**
   - このプロジェクトを開く
   - コマンドパレット（Ctrl+Shift+P）を開く
   - "Dev Containers: Reopen in Container"を選択

2. **環境変数の設定**
   ```bash
   cp env.example .env
   ```

3. **依存関係のインストール**
   ```bash
   mise run install
   ```

4. **データベースのマイグレーション**
   ```bash
   mise run db-migrate
   ```

5. **開発サーバーの起動**
   ```bash
   mise run dev
   ```

## 開くポート

- **フロントエンド**: `http://localhost:3000` (Vite dev server)
- **バックエンド**: `http://localhost:3001` (API server)
- **PostgreSQL**: `localhost:5432` (データベース)

## 利用可能なタスク

- `mise run install`: 依存関係をインストール
- `mise run dev`: フロントエンドとバックエンドを同時に起動
- `mise run dev-frontend`: フロントエンドのみ起動
- `mise run dev-backend`: バックエンドのみ起動
- `mise run build`: プロダクション用ビルド
- `mise run db-migrate`: データベースマイグレーション実行
- `mise run db-seed`: データベースにシードデータを投入

## データベース接続情報

- **ホスト**: postgres (コンテナ内) / localhost (外部から)
- **ポート**: 5432
- **データベース名**: lingo_dev
- **ユーザー名**: lingo
- **パスワード**: lingo123
