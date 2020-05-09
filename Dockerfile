FROM node:12.16.2-alpine3.11

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm ci --production

COPY dist .

EXPOSE 3000

CMD [ "node", "main" ]