import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"
import constants from "./constants"

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  ignoreTLS: true
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
 * Mail object is not exported and template/context
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

interface Mailer extends Mail {
  constants: { sender: string } & Record<"forgotPassword", SubConstants>
  sendMail(mailOptions: MailOptions, callback: (err: Error | null, info: never) => void): void
  sendMail(mailOptions: MailOptions): Promise<unknown>
}

const mailer = transporter as Mailer

mailer.constants = constants

export default mailer