#! /bin/bash

docker network create ng

docker run --rm -d \
	--network ng \
	--name dev \
	--mount type=bind,source="$(pwd)",target=/app \
	-it node:19-alpine sh

docker run --rm -d \
	--network ng \
	--name mongo -p 27017:27017 \
	-e MONGO_INITDB_ROOT_USERNAME=admin \
	-e MONGO_INITDB_ROOT_PASSWORD=secretpw \
	mongo

docker run -d --rm \
	--network ng \
	--name pg \
	-e POSTGRES_PASSWORD=mypw \
	-p 3030:5432 \
	--mount type=bind,source="$(pwd)",target=/app \
	postgres:12.16

docker run --rm --network ng \
	-it \
	-v $(pwd)/ngrok.yml:/etc/ngrok.yml \
	-e NGROK_CONFIG=/etc/ngrok.yml \
	ngrok/ngrok:alpine http dev:8080
