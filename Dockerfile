# Dockerfile
FROM node:14

WORKDIR /app
COPY . /app

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' > /etc/timezone
RUN npm set registry https://registry.npm.taobao.org/
RUN npm config set strict-ssl false
RUN npm install
# RUN npm i pm2 -g

CMD echo $SERVER_NAME && echo $AUTHOR_NAME && npm run prd-dev && npx pm2 log

ENV SERVER_NAME="lego-web-server"
ENV AUTHOR_NAME="lilongxi"