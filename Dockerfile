FROM node:22-alpine

WORKDIR /app

# Copy package files from subfolder
COPY car-company-system/package*.json ./
COPY car-company-system .

RUN npm install --production

# Copy complete project
COPY car-company-system .

EXPOSE 5000

CMD ["node", "server.js"]