FROM node:latest as wastyclient
RUN apt-get update -qq && apt-get install -y build-essential
WORKDIR /app
COPY package.json .
COPY run.sh .
COPY /build /app/build
COPY /api-mock-server /app/api-mock-server
COPY /node_modules /app/node_modules
RUN npm install -g serve
EXPOSE 3000
EXPOSE 3001
RUN chmod 777 ./run.sh
CMD "./run.sh"

