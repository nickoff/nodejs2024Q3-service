FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i
RUN npm cache clean --force

COPY . .

CMD ["npx", "prisma", "migrate", "deploy", "&&", "npx", "prisma", "generate", "&&", "npm", "run", "start:dev"]
