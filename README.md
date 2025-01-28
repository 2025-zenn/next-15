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