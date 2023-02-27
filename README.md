# Next.js + Express.js Full Stack Web Application


[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/tharindure/node-express-nextjs-fullstack/test.yml?label=Test&logo=github&style=for-the-badge&labelColor=000)](https://github.com/tharinduRE/node-express-nextjs-fullstack/actions/workflows/test.yml)
![GitHub](https://img.shields.io/github/license/tharindure/node-express-nextjs-fullstack?style=for-the-badge&labelColor=000)
![GitHub top language](https://img.shields.io/github/languages/top/tharindure/node-express-nextjs-fullstack?logo=typescript&style=for-the-badge&labelColor=000)

<!-- ![Next.js](https://img.shields.io/badge/Next-20232A?style=for-the-badge&logo=next.js)
![Express.js](https://img.shields.io/badge/express-20232A?style=for-the-badge&logo=express)
![Mongo](https://img.shields.io/badge/mongodb-20232A?style=for-the-badge&logo=mongodb)
![Redux](https://img.shields.io/badge/redux-20232A?style=for-the-badge&logo=redux)
![Turborepo](https://img.shields.io/badge/turborepo-20232A?style=for-the-badge&logo=turborepo)
![typescript](https://img.shields.io/badge/typescript-20232A?style=for-the-badge&logo=typescript)
![jest](https://img.shields.io/badge/jest-20232A?style=for-the-badge&logo=jest)
![cypress](https://img.shields.io/badge/cypress-20232A?style=for-the-badge&logo=cypress) -->


## Features
- ### API
  - **JWT authentication** /  **OAuth2**  support
  - **Error handling**: centralized error handling mechanism
  - **Request Validation** : [express-validator](https://github.com/express-validator/express-validator)
  - **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
  - **Hot Reloading**: with [concurrently](https://github.com/open-cli-tools/concurrently)
  - **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
  - **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
  - **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
  - **CI**: continuous integration with [GitHub CI](https://travis-ci.org)
  - **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)  
    - available at `/api/v1/docs` endpoint
  - **Docker support**

- ### Web
  - **Latest** Features with up-to-date Next.js Version
  - **Authentication** :  with [Next-Auth](https://github.com/nextauthjs/next-auth)
  - **Tailwind CSS** Support
  - **MUI** Components
  - **Redux** State Management
  - **Logs & Error Handling** : using [Sentry](https://sentry.io/). 
    - To configure, create a sentry project add `SENTRY_DSN` `SENTRY_AUTH_TOKEN` as environment variables in apps/web/.env

## Architecture

### Apps and Packages

- [`apps/api`](./apps/api): a [Express.js](https://expressjs.com/) app
- [`apps/web`](./apps/web): a [Next.js](https://nextjs.org/) app
- [`packages`](./packages)
  - `eslint-config-custom`: custom `eslint` config used throughout the monorepo
  - `tsconfig`: `tsconfig.json`s used throughout the monorepo
### Deployment
![architecture](./docs/architecture-2.png)
## Development

1. Download dependencies
```shell
npm install
```

2. Environment Variables
  - Add `.env` file on the **root** and add `MongoDB Connection String/URL` as Environment Variable

  ```shell
  MONGODB_URL=mongodb+srv://...
  ```
  - Add `.env.local` on **apps/web** directory and add following.

  ```.env
  GITHUB_ID=
  GITHUB_SECRET=
  NEXTAUTH_SECRET=secret
  NEXTAUTH_URL=http://localhost:3000
  NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
  ```

3. To develop all apps and packages, run the following command:

```
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) to see the frontend
- Open [http://localhost:8080](http://localhost:8080) to see the backend

To Start frontend and backend indvidually, run following command

```bash
# to run backend
npm run dev:api

# to run frontend
npm run dev:web
```

## Testing

### 1. Unit Testing
To test all apps, run the following command:

```
npm run test
```

To Run unit tests seperately on frontend and api

```bash
# to run backend
npm run test:api

# to run frontend
npm run test:web
```

### 2. End-to-End (E2E) / Integration Testing

To run end-to-end testing using cypress. 
```bash
# build apps using 
npm run build

#start apps
npm start

# Run the end-to-end testing
cd apps/web; npm run e2e
```
To learn more about testing with cypress on Next.js https://nextjs.org/docs/testing#running-your-cypress-tests

## Build

To build all apps and packages, run the following command:

```
npm run build
```

## TODO
- [x] Add JWT token authentication 
- [ ] Add Refresh token support on frontend
- [ ] Add full OAuth 2.0 support along with credential login
- [ ] Add Role-Based Authorization

## Useful Links

- [TurboRepo](https://turbo.build/) - MonoRepo used in this application.
- [Sentry](https://sentry.io/) - Centralized Error and Log handling.
- [Express.js](https://expressjs.com/) - Express.js
- [Next.js](https://nextjs.org/) - Next.js
