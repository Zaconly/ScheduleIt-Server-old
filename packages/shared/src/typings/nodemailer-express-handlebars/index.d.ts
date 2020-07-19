declare module "nodemailer-express-handlebars" {
  interface Options {
    viewEngine: Partial<ViewEngine> | string
    viewPath: string
    extName: string
  }

  interface ViewEngine {
    extName: string
    partialsDir: string
    layoutsDir: string
    defaultLayout: string | false
  }

  export default function hbs(options: Options): never
}
