FROM node:18
WORKDIR /wokedex/backend
RUN npm i -g pnpm@latest
COPY package.json ./
RUN pnpm i
COPY . .
# RUN pnpm build
EXPOSE 4447
CMD ["pnpm","start"]


