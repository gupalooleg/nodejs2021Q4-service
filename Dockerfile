FROM node:16-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install --production
RUN npm install -g nodemon
RUN npm install -g ts-node
RUN npm install @types/uuid
COPY . .
CMD ["npm", "run", "start:dev:docker"]