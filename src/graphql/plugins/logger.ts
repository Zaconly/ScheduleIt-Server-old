import { ApolloServerPlugin } from "apollo-server-plugin-base"

import { logger } from "../../utils"

const loggerPlugin: ApolloServerPlugin = {
  requestDidStart(requestContext) {
    process.env.NODE_ENV !== "production" &&
      logger.info("Request started\n" + requestContext.request.query)

    return {
      didEncounterErrors(requestContext) {
        logger.error("Request error\n" + requestContext.errors)
      }
    }
  }
}

export default loggerPlugin
