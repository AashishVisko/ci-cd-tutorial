FROM node:18-slim

WORKDIR /app

COPY package.json ./
RUN npm install --force

COPY . .

# Render will provide PORT dynamically
EXPOSE 8080

CMD ["npm", "start"]
