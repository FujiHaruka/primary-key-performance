#!/bin/sh -eux
#
# Run mysql Docker container

MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=primary_key_performance
CONTAINER_NAME=primary_key_performance
docker rm -f ${CONTAINER_NAME}
docker run -d --name ${CONTAINER_NAME} \
-p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} \
-e MYSQL_DATABASE=${MYSQL_DATABASE} \
mysql:8.0.19
