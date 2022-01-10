FROM node:16-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install --no-optional
COPY . .
CMD ["npm", "run", "start:dev:docker"]