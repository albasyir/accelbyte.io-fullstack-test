FROM node:alpine

WORKDIR /usr/app

COPY . .
RUN yarn
RUN yarn global add @vue/cli

CMD ["vue-cli-service", "serve", "--open"]
EXPOSE 3000