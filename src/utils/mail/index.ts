import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"

import { logger } from ".."
import constants from "./constants"

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "localhost",
  port: (process.env.MAIL_PORT as unknown) as number,
  ignoreTLS: true
})

transporter.verify(error => {
  if (error) {
    logger("Nodemailer: " + error.message, "ERROR")
  } else {
    logger("Nodemailer: Connected and ready")
  }
})

const templatesPath = path.join(__dirname, "templates")

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".hbs",
      layoutsDir: templatesPath + "/layouts",
      defaultLayout: templatesPath + "/layouts/main.hbs"
    },
    viewPath: templatesPath,
    extName: ".hbs"
  })
)

/**
 * Mail type is not exported and template/context
 * doesn't exist on type Mail.Options
 * so we have to manually modify Options types
 */
type Mail = typeof transporter

interface Error {
  name: string
  message: string
  stack?: string
}

interface NewOptions {
  template?: string
  context?: {
    [key: string]: string
  }
}

type MailOptions = Mail["options"] & NewOptions

interface SubConstants {
  title: string
  template: string
}

export interface Mailer extends Mail {
  constants: { sender: string } & Record<"forgotPassword", SubConstants>
  sendMail(mailOptions: MailOptions, callback: (err: Error | null, info: never) => void): void
  sendMail(mailOptions: MailOptions): Promise<unknown>
}

const mailer = transporter as Mailer
mailer.constants = constants

export default mailer
