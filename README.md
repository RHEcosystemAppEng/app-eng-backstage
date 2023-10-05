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

Our attempt to use Podman for building the image has been unsuccessful, so we're considering Docker. However, Docker Desktop needs a commercial license, so we are going to use an alternate free version `colima` with docker CLI. Please go through [docker setup with Colima](https://dev.to/elliotalexander/how-to-use-docker-without-docker-desktop-on-macos-217m).



Execute the below command to build and push the docker image.

```shell
 make image/build 

```

### Known Issues or Help
If you run into an issue ```The command '/bin/sh -c yarn install' returned a non-zero code: 137``` while building the docker image increase memory using the below command. 
```shell
colima start --cpu 4 --memory 8 --disk 30
```
