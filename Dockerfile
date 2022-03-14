# ----------------------------------------------------------------------
# First stage, compile application
# ----------------------------------------------------------------------

FROM node:14 AS builder

WORKDIR /usr/src/app

# development or production
ARG DEPLOY_ENV=""
ENV DEPLOY_ENV="${DEPLOY_ENV:-}"

# copy only package for caching purposes
COPY package*.json /usr/src/app/
COPY tools/ /usr/src/app/tools/
RUN npm install

# install peer dependencies yourself
RUN npm install react@~16.14.0 react-dom@~16.14.0 react-redux@~7.1.0 redux-thunk@~2.3.0 redux@~4.0.1 react-router-dom@~5.2.0 @material-ui/core@^4.11.0 @material-ui/icons@^4.9.1 babel-polyfill@^6.26.0

# copy rest of application
COPY .babelrc .eslintrc .istanbul.yml *.js /usr/src/app/
COPY src /usr/src/app/src/

# build application
RUN npm run build

# ----------------------------------------------------------------------
# Second stage, final image
# ----------------------------------------------------------------------

FROM nginx:alpine

RUN apk add --no-cache jq
RUN mkdir /usr/share/nginx/html/playbook && \
  mkdir /usr/share/nginx/html/playbook/public

COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html/playbook/
COPY src/public /usr/share/nginx/html/playbook/public/
COPY playbook.conf /etc/nginx/conf.d/default.conf
