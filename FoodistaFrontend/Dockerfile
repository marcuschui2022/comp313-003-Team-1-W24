FROM node:20

WORKDIR /app

COPY . .

RUN npm install && npm run build

RUN npm install -g serve

EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3001"]
