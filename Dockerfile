From node:13.5.0-alpine

MAINTAINER mem.mojtaba@gmail.com

WORKDIR /account_management

COPY ./package*.json ./
RUN npm install --silent

COPY . .

EXPOSE 5000
CMD ["npm", "start"]
