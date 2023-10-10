FROM node:latest
WORKDIR /wokedex/react-app
RUN npm i -g pnpm@latest
COPY package.json .
RUN pnpm i
COPY . .
EXPOSE 3000
RUN pwd
RUN ls
CMD ["pnpm","start"]