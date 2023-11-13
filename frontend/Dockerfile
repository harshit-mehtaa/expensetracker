FROM node:18.13-alpine as builder
WORKDIR /home/frontend
COPY . .

RUN npm install

RUN npm run build

FROM node:18.13-alpine as runner
WORKDIR /home/frontend
COPY --from=builder /home/frontend/build ./build

EXPOSE 3000

CMD [ "npm", "run", "prod" ]
