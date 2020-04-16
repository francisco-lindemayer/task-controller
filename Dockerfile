FROM node:alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home

WORKDIR /home/node/api

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3333

CMD ["npm", "start"]

