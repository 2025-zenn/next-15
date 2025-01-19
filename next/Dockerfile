# ==================================================
# パッケージのインストールのレイヤー
# ==================================================
FROM node:22.6.0-alpine3.20 AS deps
WORKDIR /base

COPY package*.json ./
RUN  npm ci

# ==================================================
# アプリのビルドレイヤー
# ==================================================
FROM node:22.6.0-alpine3.20 AS builder
WORKDIR /build
COPY --from=deps /base/node_modules ./node_modules

COPY . /build
COPY package.json ./

# buildは、tsからjsに変換するのでこれがないとエラーになる
COPY tsconfig.json .

# nextのbuildの設定ルール
COPY next.config.* .

RUN npm run build

# ==================================================
# アプリの実行レイヤー
# ==================================================
FROM node:22.6.0-alpine3.20

WORKDIR /app/next

COPY --from=builder /build/.next ./.next
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json

# NOTE: コンテナで使うツール
ARG TOOL="curl bash"

RUN apk upgrade && \
    apk add --no-cache \
        ${TOOL}
# RUN apk del ${TOOL}

EXPOSE 3000

# コマンド
# CMD ["npm", "run", "dev", "--", "-p", "3000"]