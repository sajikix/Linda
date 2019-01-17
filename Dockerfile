# ベースイメージを指定
# 今回は LTS の 8.9.4 にする
# alpine は 軽量の linux OS
FROM node:10.14.1-alpine
# ディレクトリを移動する
WORKDIR /usr/app

# RUN apt-get update && apt-get install -y git
RUN npm i lerna -g --loglevel notice

COPY package.json .
RUN npm install

COPY /modules/linda-client-async ./modules/linda-client-async
COPY /modules/linda-server ./modules/linda-server
COPY /modules/linda-interface ./modules/linda-interface

ENV NODE_ENV=development

COPY lerna.json .
RUN npm run bootstrap

WORKDIR /usr/app/modules/linda-server
RUN npm run build

EXPOSE $PORT
CMD ["npm","start"]