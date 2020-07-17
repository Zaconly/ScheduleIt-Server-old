import "dotenv/config"
import { testVar } from "./test"

// eslint-disable-next-line no-console
console.log(testVar, process.env.TEST_ENV)
