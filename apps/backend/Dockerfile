FROM node:18
WORKDIR /apps/backend
RUN npm i -g pnpm@latest typescript ts-node turbo
COPY package.json ./
RUN pnpm i
COPY . .
RUN turbo run build
RUN rm -rf ./{src, tsconfig.json}


