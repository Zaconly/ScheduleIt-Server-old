declare module "dataloader-sequelize" {
  import { Sequelize } from "sequelize/types"

  interface Options {
    max: number
  }

  interface ContextProps {
    prime: (query: any) => any
  }

  export const EXPECTED_OPTIONS_KEY: string
  export function createContext(sequelize: Sequelize, options?: Options): ContextProps
}
