# 1. Bazaviy image
FROM node:20

# 2. Loyihani konteynerga nusxalash
WORKDIR /app
COPY . .

# 3. Dependencies o‘rnatish

COPY package*.json ./
RUN npm install

COPY . .

# 5. Port ochish
EXPOSE 8080

# 6. Loyihani ishga tushirish
CMD ["npm", "run", "start:dev"]