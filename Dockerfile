FROM node:18-alpine

WORKDIR /src

COPY . .
RUN npm install --production
RUN npm run build
CMD [ "npm" ,"run","start" ]