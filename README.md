# @schedule-it/api

## Getting Started

To launch the server in development mode:

```bash
docker-compose -f docker/mysql.yml up -d # Launch MySQL Server & create databases
docker-compose -f docker/maildev.yml up -d # Launch Mail Server
docker-compose -f docker/redis.yml up -d # Redis cache Server


# Run with Node
yarn install # Install depedencies
# Then Rename `.env.example` to `.env`
yarn dev


# Run with Docker
docker-compose -f docker/app.yml up -d
```

To generate types after GraphQL Schema modification (src/graphql/typeDefs/):

```bash
yarn generate
```

To generate fake data:

```bash
yarn feker:gen

# To delete all data
yarn faker:clean
```

To access development MailDev server, go to [http://localhost:1080](http://localhost:1080)

Use [http://localhost:4000/graphql](http://localhost:4000/graphql) to interact with GraphQL server.

You can start editing the server by modifying `src/**/*.ts`. It will auto-updates as you edit the file.

To run in production mode:

```bash
yarn build
# then
yarn start
```
