import c from "chalk"

type LoggerType = "INFO" | "WARNING" | "ERROR" | "CRON"

export const logger = (message: string, type?: LoggerType): void => {
  const dev = process.env.NODE_ENV !== "production"
  const dateFormat = `[${new Date().toLocaleString()}] `

  switch (type) {
    case "WARNING":
      dev && console.warn(c.yellowBright(`WARN ${dateFormat}`) + message)
      break
    case "ERROR":
      dev && console.error(c.redBright(`ERROR ${dateFormat}`) + message)
      break
    case "CRON":
      console.info(c.magentaBright(`CRON ${dateFormat}`) + message)
      break
    default:
      dev && console.info(c.blueBright(`INFO ${dateFormat}`) + message)
  }
}
