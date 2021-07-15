FROM node:14-alpine

# Install Python if necessary
RUN apk add g++ make python

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 9001
CMD [ "node", "src/index-cluster.js" ]
