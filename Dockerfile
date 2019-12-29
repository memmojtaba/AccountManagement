FROM node:13.5.0 as starter

MAINTAINER mem.mojtaba@gmail.com

WORKDIR /app

COPY ./package.json .
RUN npm install --silent

COPY . .
RUN npm run build

From node:13.5.0-alpine as runtime
RUN npm i -g forever 
RUN npm install express --save

From runtime
WORKDIR /app
RUN mkdir ./build
COPY --from=starter /app/server.js /app
COPY --from=starter /app/build /app/
EXPOSE 5000
CMD ["forever", "./server.js"]
