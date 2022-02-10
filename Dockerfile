FROM node:alpine as appbuild
WORKDIR /app
COPY package.json .
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
COPY /src .
RUN npm build

#### stage 2 
# FROM node:0.12 as wastytodo
# WORKDIR /app
# RUN npm install -g serve
# COPY --from=appbuild /app/build .
# COPY /api-mock-server .
# COPY .env .
# COPY /package.json .
# EXPOSE 3000
# ENTRYPOINT [ "serve" ]
# RUN serve -s build && npm run server-start
