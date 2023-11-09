FROM node:18.13-alpine as builder

WORKDIR /home/frontend
COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
