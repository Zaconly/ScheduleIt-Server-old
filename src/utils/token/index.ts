import jwt from "jsonwebtoken"
import crypto from "crypto"
import { Request } from "express"
import { Maybe } from "../../graphql/types"
import { AccessTokenPayload, TokenPayload, TokenType, DecodedData } from "./types"

/**
 * Create a new JWT access token
 */
export const generateAccessToken = async ({
  id,
  role
}: DecodedData): Promise<AccessTokenPayload> => {
  const expInMinutes = 20

  const accessToken = jwt.sign({ id, role }, process.env.TOKEN_SECRET as string, {
    expiresIn: expInMinutes + "m"
  })

  return {
    accessToken,
    expiryDate: new Date(Date.now() + expInMinutes * 60 * 1000)
  }
}

/**
 *  Create a refresh token
 */
export const generateRefreshToken = async (): Promise<string> =>
  crypto.randomBytes(32).toString("base64")

/**
 * Generate Access & Refresh token
 */
export const generateTokens = async (me: DecodedData): Promise<TokenPayload> => {
  const { accessToken, expiryDate } = await generateAccessToken(me)
  const refreshToken = await generateRefreshToken()

  return {
    accessToken,
    expiryDate,
    refreshToken
  }
}

/**
 * Retrieve Access or Refresh Token
 *
 * @param name Optional param `"access" | "refresh"`
 */
const getToken = (req: Request, name: TokenType = "access"): Maybe<string> => {
  if (name === "access") {
    if (req.headers.authorization) {
      const [bearer, token] = req.headers.authorization.split(" ")

      if (bearer === "Bearer" && token) {
        return token
      }
    }
  } else if (name === "refresh") {
    return (req.headers["refresh-token"] as string) || null
  }

  return null
}

/**
 * Verify provided Access token
 */
export const validateToken = async (req: Request): Promise<Maybe<DecodedData>> => {
  const token = getToken(req)

  if (token) {
    return jwt.verify(token, process.env.TOKEN_SECRET as string) as Maybe<DecodedData>
  }

  return null
}
