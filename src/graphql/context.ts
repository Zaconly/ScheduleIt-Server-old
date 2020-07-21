import { Mailer } from "../utils/mail"
import { Request, Response } from "express"
import { Maybe } from "./types"
import { DecodedData } from "../utils/token/types"

export interface Context {
  me: Maybe<DecodedData>
  mailer: Mailer
  req: Request
  res: Response
}
