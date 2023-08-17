FROM node:18-alpine

WORKDIR /server

COPY package*.json ./
COPY public/ ./

RUN npm i

COPY . .

EXPOSE 8080

CMD ["npm", "start"]