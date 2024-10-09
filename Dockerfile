FROM node:latest
RUN apt-get update && apt-get install -y curl
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000