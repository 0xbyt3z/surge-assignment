FROM node:18-alpine

WORKDIR /src

COPY . .
RUN npm ci
RUN npm run build
# CMD [ "npm" ,"run","start" ]
RUN npm run start
RUN npm run test