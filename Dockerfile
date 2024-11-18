FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i
RUN npm cache clean --force

COPY . .


CMD ["npm", "run", "start:service"]
