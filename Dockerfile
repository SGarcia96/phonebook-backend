FROM node:14-alpine
WORKDIR /app
ADD . .
RUN npm install
CMD node index.js