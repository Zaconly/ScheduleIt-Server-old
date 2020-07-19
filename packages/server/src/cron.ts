import cron from "node-cron"
import { logger } from "@monorepo/shared"
import { ResetToken, Op, fn } from "@monorepo/database"

export default () => {
  /**
   * Delete used and expired records in `ResetTokens`
   * table in database every day at 00:00
   */
  cron.schedule("0 0 0 * * *", () => {
    logger("Deleting obsolete `ResetTokens` rows", "CRON")

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
