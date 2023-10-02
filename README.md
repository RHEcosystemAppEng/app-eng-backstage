# [App Engineering Backstage](https://github.com/RHEcosystemAppEng/app-eng-backstage)

Backstage app for App Engineering team.

To start the app, run:

To start the application, execute:
```sh
yarn install
yarn tsc
yarn dev
```

# Building the docker image.

Docker Desktop needs commercial license, so we are going to use alternate free version `colima` with docker cli. Please go through [docker setup with Colima](https://dev.to/elliotalexander/how-to-use-docker-without-docker-desktop-on-macos-217m).

We need to increase the memory to build the backstage image. You can use below command to increase the memory or colima VM spec.


Execute below command to build the docker image.

```shell
docker build --no-cache -t quay.io/ecosystem-appeng/appeng-backstage:2.0 . -f Dockerfile
```

### Known Issues or Help
If you run into issue ```The command '/bin/sh -c yarn install' returned a non-zero code: 137``` while building docker image increase memory using below command. 
```shell
colima start --cpu 4 --memory 8 --disk 30
```
