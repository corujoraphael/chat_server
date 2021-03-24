FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent
RUN npm install pm2 -g
# RUN npm ci --only=production

COPY . .
EXPOSE 8080
CMD [ "pm2", "start", "swagger.js" ]