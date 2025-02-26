FROM node:22-alpine

COPY app /usr/app
WORKDIR /usr/app

RUN npm i -g pnpm
RUN pnpm install --force

EXPOSE 3000

CMD npm start
