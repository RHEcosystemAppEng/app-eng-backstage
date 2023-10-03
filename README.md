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

Our attempt to use Podman for building the image been unsuccessful, so we're considering Docker.However, Docker Desktop needs commercial license, so we are going to use alternate free version `colima` with docker cli. Please go through [docker setup with Colima](https://dev.to/elliotalexander/how-to-use-docker-without-docker-desktop-on-macos-217m).

We need to increase the memory to build the backstage image. You can use below command to increase the memory or colima VM spec.


Execute below command to build and push the docker image.

```shell
 make image/build 

```

```shell
 make image/push 

```


### Deploy Backstage/Janus IDP using Openshift Template :

update the variables in MakeFile  

```
 AUTH_GITHUB_CLIENT_ID 
 AUTH_GITHUB_CLIENT_SECRET 
 GITHUB_TOKEN
``` 
For deploying, run the command `make template/apply`. For cleaning up, run the command `make template/clean`.


### Known Issues or Help
If you run into issue ```The command '/bin/sh -c yarn install' returned a non-zero code: 137``` while building docker image increase memory using below command. 
```shell
colima start --cpu 4 --memory 8 --disk 30
```




