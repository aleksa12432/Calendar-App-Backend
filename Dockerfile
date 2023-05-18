FROM node:alpine

ENV PORT=3000

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

