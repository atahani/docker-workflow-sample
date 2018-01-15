FROM node:9.4.0-slim
MAINTAINER "ahmad.tahani@gmail.com"

RUN mkdir -p /nodejs/app

WORKDIR /nodejs/app/

#copy app files to WORKDIR
COPY index.js .
COPY package.json .

#install nodejs dependencies
RUN npm install

CMD npm install && node index.js
