FROM node:18-alpine

WORKDIR /build

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "run", "dev"]