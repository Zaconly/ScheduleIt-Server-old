import c from "chalk"

import { ServerError } from "../../graphql/errors"

const dateFormat = `[${new Date().toLocaleString()}]`

export const logger = {
  info: (message: string) => console.info(c.blueBright(`INFO ${dateFormat} `) + message),
  warn: (message: string) => console.warn(c.yellowBright(`WARN ${dateFormat} `) + message),
  error: (message: string) => console.error(c.redBright(`ERROR ${dateFormat} `) + message),
  cron: (message: string) => console.info(c.magentaBright(`CRON ${dateFormat} `) + message)
}

export const ServerErrorLogger = (e: Error) => {
  logger.error(JSON.stringify(e, null, 2))
  throw new ServerError(e.message)
}
