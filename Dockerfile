FROM node:18-slim

WORKDIR /app

COPY package.json .

RUN npm install -f

COPY . .

# EXPOSE 8080
EXPOSE 8080

CMD ["npm", "start"]