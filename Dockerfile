FROM node:13.5.0-alpine

LABEL MAINTAINER="Mojtaba M <mem.mojtaba@gmail.com>"

RUN apk add --update --no-cache npm curl

WORKDIR /account_management

COPY ./package*.json ./
RUN npm install --silent

COPY . .

EXPOSE 5000
CMD ["npm", "start"]
