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


## ライセンス

元のFlaskアプリと同様、学習・テスト用途です。