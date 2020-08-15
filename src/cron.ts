import cron from "node-cron"
import { fn, Op } from "sequelize"

import { ResetToken } from "./database/models"
import { logger } from "./utils"

export default () => {
  /**
   * Delete used and expired records in `ResetTokens`
   * table in database every day at 00:00
   */
  cron.schedule("0 0 0 * * *", () => {
    logger.cron("Deleting obsolete `ResetTokens` rows")

    ResetToken.destroy({
      where: {
        [Op.or]: {
          expirationDate: { [Op.lt]: fn("CURDATE") },
          isUsed: true
        }
      }
    })
  })
}
