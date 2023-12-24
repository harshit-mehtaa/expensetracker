FROM node:21-alpine as builder

WORKDIR /home/frontend
COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]