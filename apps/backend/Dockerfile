FROM node:18
WORKDIR /apps/backend
RUN npm i -g pnpm@latest typescript ts-node turbo
COPY package.json ./
RUN pnpm i
COPY . .
# RUN npx turbo run build
# RUN rm -rf ./{src, tsconfig.json}
CMD ["npx","turbo","run","start:build","--filter","backend"]


