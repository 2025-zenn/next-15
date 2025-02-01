# 環境

| パッケージ名 | バージョン |
|------------|-----------|
| @types/node | 20.17.14 |
| @types/react | 19.0.7 |
| eslint | 9.18.0 |
| next | 15.1.5 |
| react | 19.0.0 |
| tailwindcss | 3.4.17 |
| typescript | 5.7.3 |
| gcloud | 507.0.0 |

# 概要

- next15

# 環境構築

```bash
git clone https://github.com/2025-zenn/next-15.git
cd next-15
cp next/.env.sample next/.env.local
```

```bash
docker-compose up -d
```

## アプリ

- http://localhost:3000

## API

```bash
docker-compose exec front bash
```

```bash
curl http://localhost:3000/api/health
```

# デプロイ

- GCPの初期設定

    ```bash
    gcloud init
    gcloud auth login --no-launch-browser
    ```

- クレデンシャルファイルの生成

    ```bash
    gcloud auth application-default login
    ```

- クレデンシャルファイルのパスを確認する

    ```bash
    # ログイン後のレスポンスに保存先のパスが表示される
    ~~
    Credentials saved to file: [/root/.config/...]
    ```

- .env.localの変数を修正

    ```.env.local
    GOOGLE_APPLICATION_CREDENTIALS={`gcloud auth application-default login`で生成されるキーファイルのパス}
    NEXT_PUBLIC_GEMINI_API_KEY={GCPで作成したVertexAIのAPIキー}
    NEXT_PUBLIC_PROJECT_ID={GCPのプロジェクトID}
    ```
