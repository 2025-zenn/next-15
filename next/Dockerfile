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
COPY --from=builder /build/public ./public
COPY --from=builder /build/.next/static ./.next/static
COPY --from=builder /build/.next/standalone ./

# NOTE: コンテナで使うツール
ARG TOOL="curl bash python3"
ARG BUILD_TOOL="tar"

RUN apk upgrade && \
  apk add --no-cache \
  ${TOOL} \
  ${BUILD_TOOL} && \
  curl -sSL https://sdk.cloud.google.com | bash && \
  apk del ${BUILD_TOOL} && \
  rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

ENV PATH $PATH:/root/google-cloud-sdk/bin

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"
# ビルド時の引数を受け取る
ARG ENV_FILE
COPY $ENV_FILE .env.production

EXPOSE 3000

# コマンド
CMD ["node", "server.js"]
# CMD ["npm", "run", "dev", "--", "-p", "3000"]
