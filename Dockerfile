FROM node:alpine3.18
WORKDIR /app
# RUN apk update && apk add bash
COPY package*.json .
RUN ["npm", "i"]
COPY . .
# RUN apk update && apk add git
# RUN ["npm", "i", "-g", "db-migrate"]
EXPOSE 8080
CMD [ "npm", "run", "dev"]
