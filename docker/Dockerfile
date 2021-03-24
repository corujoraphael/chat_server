FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
RUN npm install --silent
RUN npm install pm2 -g
RUN pm2 start swagger.js
EXPOSE 8080

WORKDIR /usr/src/app/socket
RUN pm2 start index.js
EXPOSE 3001