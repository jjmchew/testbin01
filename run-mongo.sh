#! /bin/bash

docker exec -it mongo mongosh \
	-u admin -p secretpw \
	--authenticationDatabase admin \
	projdb
