# @schedule-it/api

## Getting Started

To launch the server in development mode:

```bash
docker-compose -f docker/mysql.yml up -d # Launch MySQL Server & create databases
docker-compose -f docker/maildev.yml up -d # Launch Mail Server
docker-compose -f docker/redis.yml up -d # Redis cache Server
yarn install # Install depedencies
yarn generate # Generate GraphQL types
# Rename `.env.example` to `.env`
yarn dev
```

Use [http://localhost:4000/graphql](http://localhost:4000/graphql) to interact with GraphQL server.

You can start editing the server by modifying `packages/**/*.ts`. It will auto-updates as you edit the file.

To run in production mode:

```bash
yarn build
# then
yarn start
```
