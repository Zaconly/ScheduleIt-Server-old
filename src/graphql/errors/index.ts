import { ApolloError } from "apollo-server-express"

export class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, "NOT_FOUND")
  }
}

export class CredentialsError extends ApolloError {
  constructor(message = "Wrong credentials") {
    super(message, "WRONG_CREDENTIALS")
  }
}

export class ServerError extends ApolloError {
  constructor(message = "Internal Server Error") {
    super(message, "INTERNAL_SERVER_ERROR")
  }
}

export class TokenError extends ApolloError {
  constructor(message: string) {
    super(message, "INVALID_TOKEN")
  }
}
