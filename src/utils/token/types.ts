import { User } from "../../graphql/types"

export interface AccessTokenPayload {
  accessToken: string
  expiryDate: Date
}

export interface TokenPayload extends AccessTokenPayload {
  refreshToken: string
}

export type DecodedData = Pick<User, "id" | "role">

export type TokenType = "access" | "refresh"
