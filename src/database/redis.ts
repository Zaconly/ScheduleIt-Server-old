import Redis from "ioredis"

import { logger } from "../utils"

const { REDIS_PORT, REDIS_HOST = "localhost" } = process.env

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_HOST === "localhost" ? ((REDIS_PORT as unknown) as number) : undefined
})

redis.on("connect", () => {
  logger("Redis: client connected")
})

redis.on("error", err => {
  logger("Redis: " + err, "ERROR")
})

export default redis
