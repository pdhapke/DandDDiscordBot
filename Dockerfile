
FROM node:latest

#create directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

#Copy files
COPY package.json /usr/src/bot

#Install dependencies
RUN npm install

#Copy bot files
COPY . /usr/src/bot

#Start it up
CMD ["node", "index.js"]

