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
ENV REACT_APP_PROXY_NAME=$REACT_APP_PROXY_NAME

RUN npm run build

FROM nginx:stable-alpine as serve

COPY --from=build /usr/src/app/frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE $REACT_APP_PORT