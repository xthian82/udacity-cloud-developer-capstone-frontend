#!/usr/bin/env bash

docker build -t xthian82/udacity-front-capstone:v0.0.1 .
docker run -d -it -p 3000:3000 xthian82/udacity-front-capstone:v0.0.1

# docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true xthian82/udacity-front-captsone:v0.0.1
