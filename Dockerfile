# Do yarn install in the full image
FROM mhart/alpine-node AS builder
ENV NODE_ENV=development

WORKDIR /app

COPY yarn.lock ./
COPY package.json ./

# Need to build with development packages for Typescript
RUN yarn

COPY . .

ENV NODE_ENV=production

# Use build tools, installed as development packages, to produce a release build
RUN yarn build

# Reduce installed packages to production-only
RUN npm prune --production

# And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:base
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]