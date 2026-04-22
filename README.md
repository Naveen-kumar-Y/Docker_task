# Testing Node App with Jest

Using Jest and Supertest to add unit and functional test to Node App.

## Useful npm scripts

### Run the tests

There are two types of tests, the unit tests and the functional tests. These can be executed as follows.

-   Run unit tests only

    ```console
    $ npm run test:unit
    ```

-   Run functional tests only

    ```console
    $ npm run test:functional
    ```

-   Run both unit and functional tests

    ```console
    $ npm run test
    ```

### Run the application

Run the application which will be listening on port `3000`.

```console
$ npm start
```

## Useful docker comands

### Run docker compose

There are two environments in Docker Compose. These can be executed as follows.

-   Run development environment

    ```console
    $ docker-compose -f docker-compose.dev.yml up --build
    ```

-   Run production environment

    ```console
    $ docker-compose -f docker-compose.yml up --build
    ```

-   Run tests inside Docker container

    ```console
    $ docker build -t node-docker --target test .
    ```

https://docs.microsoft.com/en-us/learn/modules/deploy-nodejs/
https://github.com/MicrosoftDocs/node-essentials
