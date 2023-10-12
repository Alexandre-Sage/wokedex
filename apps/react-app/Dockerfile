FROM node:latest as builder
WORKDIR /apps/react-app
RUN npm i -g pnpm@latest
COPY package.json .
RUN pnpm i
COPY . .
EXPOSE 3000
RUN pwd
RUN ls
RUN pnpm build 


FROM nginx:latest
ENV NGINX_PORT 80
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /apps/react-app/build .