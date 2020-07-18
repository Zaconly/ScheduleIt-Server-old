import { ApolloServerPlugin } from "apollo-server-plugin-base"
import { logger } from "@monorepo/shared"

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
