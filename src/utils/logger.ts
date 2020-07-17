import { ApolloServerPlugin } from "apollo-server-plugin-base"
import c from "chalk"

type LoggerType = "INFO" | "WARNING" | "ERROR"

export const logger = (message: string, type?: LoggerType): void => {
  const dateFormat = `[${new Date().toLocaleString()}] `

  switch (type) {
    case "WARNING":
      console.warn(c.yellowBright(`WARN ${dateFormat}`) + message)
      break
    case "ERROR":
      console.error(c.redBright(`ERROR ${dateFormat}`) + message)
      break
    default:
      console.info(c.blueBright(`INFO ${dateFormat}`) + message)
  }
}

const loggerPlugin: ApolloServerPlugin = {
  requestDidStart(requestContext) {
    logger("Request started\n" + requestContext.request.query)

    return {
      didEncounterErrors(requestContext) {
        logger("Request error\n" + requestContext.errors, "ERROR")
      }
    }
  }
}

export default loggerPlugin
