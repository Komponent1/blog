FROM node:19-alpine

COPY app /usr/app
WORKDIR /usr/app

ENV NODE_OPTIONS="--max-old-space-size=2048"
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true

RUN npm i -g pnpm
RUN pnpm install --force

EXPOSE 4000
CMD npm run dev
