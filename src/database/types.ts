export enum Role {
  User = "USER",
  Admin = "ADMIN"
}

export interface Config {
  username: string
  password: string
  database: string
  host: string
  port?: number
  dialect: string
}
