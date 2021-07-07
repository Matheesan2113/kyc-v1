FROM node:lts-alpine as build

RUN mkdir -p /usr/src/app/frontend

WORKDIR /usr/src/app/frontend

COPY package*.json ./
RUN npm ci

COPY . .

# Set env vars
ARG REACT_APP_PORT
ARG REACT_APP_PROXY
ENV REACT_APP_PORT=$REACT_APP_PORT
ENV REACT_APP_PROXY=$REACT_APP_PROXY

EXPOSE $REACT_APP_PORT
CMD ["npm", "start"]
