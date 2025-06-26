# 1. Bazaviy image
FROM node:20

# 2. Loyihani konteynerga nusxalash
WORKDIR /app
COPY . .

# 3. Dependencies o‘rnatish
RUN npm install

# 5. Port ochish
EXPOSE 4000

# 6. Loyihani ishga tushirish
CMD ["npm", "run", "start:dev"]