FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
RUN npm install --silent
RUN npm install pm2 -g
EXPOSE 8080

WORKDIR /usr/src/app/socket
EXPOSE 3001