FROM node:16-alpine

COPY app /usr/app
WORKDIR /usr/app

ENV NODE_OPTIONS="--max-old-space-size=2048"
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true

RUN npm install

EXPOSE 3000
CMD npm start
