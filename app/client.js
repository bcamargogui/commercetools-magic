import {
  createClient,
  createHttpClient,
  createAuthForClientCredentialsFlow,
  createCorrelationIdMiddleware,
} from '@commercetools/sdk-client-v2'

const projectKey = process.env.CTP_PROJECT_KEY;

//console.log("ProjectKey: " + projectKey);

const authMiddleware = createAuthForClientCredentialsFlow({
  host: process.env.CTP_AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID,
    clientSecret: process.env.CTP_CLIENT_SECRET,
  },
  scopes: [process.env.CTP_SCOPES],
  fetch,
})

const httpMiddleware = createHttpClient({
  host: process.env.CTP_API_URL,
  fetch,
})

// Add X-Correlation-Id header for debugging/troubleshooting
const correlationIdMiddleware = createCorrelationIdMiddleware({
  generate: () => String
})

export const ctpClient  = createClient({
  middlewares: [authMiddleware, httpMiddleware, correlationIdMiddleware],
})


/*
import { ClientBuilder, createAuthForClientCredentialsFlow, createHttpClient } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import fetch from 'node-fetch'

const projectKey = 'nebula-terra-poc-2022' // process.env.CTP_PROJECT_KEY || ''

const authMiddlewareOptions = {
  host: 'https://auth.us-central1.gcp.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: 'u-4Xn1edhnFzQIsb8y_0XK5Z', // process.env.CTP_CLIENT_ID || '',
    clientSecret: 'vt_GhZlJmg-Z0LBTfmHURBi4U9Fdcc-R', // process.env.CTP_CLIENT_SECRET || '',
  },
  oauthUri: process.env.adminAuthUrl || '',
  scopes: [`manage_project:${projectKey}`],
  fetch,
}

const httpMiddlewareOptions = {
  host: 'https://api.us-central1.gcp.commercetools.com',
  fetch,
}

const client = new ClientBuilder()
//  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build()

const apiRoot = createApiBuilderFromCtpClient(client)

export {apiRoot}

*/