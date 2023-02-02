/* eslint-disable turbo/no-undeclared-env-vars */
import pino from 'pino'


let pinoConfig = {
  browser: {},
  level: 'debug',
  base: {
    env: process.env.NODE_ENV,
    revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
  },
}

const logger = pino(pinoConfig)

export const log = (msg: any) => logger.info(msg)
export default logger