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

Execute below command to build the docker image.

```shell
docker build --no-cache -t quay.io/ecosystem-appeng/appeng-backstage:2.0 . -f Dockerfile
```

Testing the actions 2.
