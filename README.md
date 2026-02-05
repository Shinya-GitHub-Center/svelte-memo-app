# メモアプリ - SvelteKit版

FlaskベースのメモアプリをSvelteKit + TypeScript + Drizzle ORMに移植したバージョンです。

## 技術スタック

- **フロントエンド**: Svelte 5
- **フレームワーク**: SvelteKit 2
- **言語**: TypeScript
- **データベース**: Cloudflare D1 (ローカルはminiflare・本番)
- **ORM**: Drizzle ORM
- **パッケージマネージャ**: bun
- **デプロイ**: Cloudflare Workers

## プロジェクト構造

```
svelte-memo-app/
├── src/
│   ├── lib/
│   │   ├── server/
│   │   │   └── db/
│   │   │       ├── schema.ts          # データベーススキーマ定義
│   │   │       ├── index.ts           # データベースクライアント作成
│   │   │       └── migrations/        # マイグレーションファイル
│   │   └── components/                # 共有コンポーネント（必要に応じて）
│   ├── routes/
│   │   ├── +layout.svelte            # レイアウトテンプレート
│   │   ├── +page.svelte              # メモ一覧画面
│   │   ├── +page.server.ts           # メモ一覧のサーバーロジック
│   │   └── memo/
│   │       └── [id]/
│   │           ├── +page.svelte      # メモ編集画面
│   │           └── +page.server.ts   # メモ編集のサーバーロジック
│   ├── styles/
│   │   └── global.css                # グローバルCSS
│   ├── app.d.ts                      # 型定義
│   └── hooks.server.ts               # サーバーフック（データベース初期化）
├── static/
│   └── images/                       # 静的画像ファイル
├── db/
│   └── memo.sqlite                   # （未使用）
├── drizzle.config.ts                 # Drizzle設定
├── svelte.config.js                  # SvelteKit設定
├── vite.config.ts                    # Vite設定
├── wrangler.toml                     # Cloudflare Workers設定
└── package.json
```

## 主な機能

- ✅ メモの一覧表示
- ✅ メモの新規作成
- ✅ メモの編集
- ✅ メモの削除
- ✅ ライト/ダークモード対応
- ✅ レスポンシブデザイン
- ✅ SSR（サーバーサイドレンダリング）

## 本番環境と開発環境の違い
- 開発環境はBasic認証なし
- リモート本番環境の場合は（IS_PRODフラグが読み込める場合）、すべてのリクエストごとにBasic認証させる。
- リモート環境へのシークレットキーの注入方法は`bun run secret <key_name>`で行う。（一度デプロイした後に行うこと）
- 行うべきキーは`IS_PROD`（これの値は適当でよい）、`AUTH_USERNAME`、`AUTH_PASSWORD`の3つである。

## デプロイフロー
1. CloudflareにD1データベースを作成後、データベースIDをコピー
2. `wrangler.toml`の該当箇所に上記データベースIDをペースト
3. `bun run push:remote`
4. `bun run build`
5. `bun run deploy`
6. シークレットキーの注入

## ライセンス

元のFlaskアプリと同様、学習・テスト用途です。