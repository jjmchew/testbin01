# Docker test deployment project

## May 26, 2024
- this project is intended to have 4 containers when used locally : ngrok, postgresql, mongodob, app
- for deployment to digital ocean (intended to go to droplet "dockerTest"):
  - ngrok will NOT be necessary
  - however, postgresql, mongodb, and app containers should all be required

- this repo was created since it is assumed that source files (such as docker compose) will need to be made available on the VPS to facilitate loading and managing multiple containers
  - hence, it's likely easiest to build the app container on the vps and spin up the required containers on the vps


