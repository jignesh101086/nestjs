FROM node:20.10.0-alpine3.19

ARG APP_NAME
ARG APP_ENV=local

ENV APP_ENV=${APP_ENV}
ENV APP_NAME_ENV=${APP_NAME}

WORKDIR /srv/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN cp .env.${APP_ENV} .env

RUN npm run build

EXPOSE 3000

CMD npm run start