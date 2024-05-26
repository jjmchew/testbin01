#! /bin/bash

docker run --rm \
	--network ng \
	--name ngrok \
	-it \
	-v $(pwd)/ngrok.yml:/etc/ngrok.yml \
	-e NGROK_CONFIG=/etc/ngrok.yml \
	ngrok/ngrok:alpine http dev:8080
