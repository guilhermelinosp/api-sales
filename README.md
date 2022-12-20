# <div align="center"> API Easy Sales </div>

</br>

<div align="center">
<p>🚧 It is in Development 🚧</p>

</br>

![image 1](/.github/image.png)

</div>

</br>

## Technologies used in the project

- Typescript
- NodeJS
- Express
- Typeorm
- Swagger

## Technologies used outside the project

- Docker
- insominia
- Beekeeper

## Technologies used to deploy

- Heroku | API
- Railway | Database

## How to run the project

- Clone this repository

```shell
git clone https://github.com/guilhermelinosx/api-easy-sales.git
```

</br>

- Create a PostgreSQL Container using Docker

```shell
docker container create --name api-easy-sales -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres
```

</br>

- Start the Container

```shell
docker container start api-easy-sales
```

</br>

- Stop the Container

```shell
docker container stop api-easy-sales
```

</br>

- Start the Application in Development

```shell
yarn install
yarn dev
```

</br>

- To stop the Application click CTRL+C in your terminal
