#fetch
  // src/graphql/client.ts
const GRAPHQL_ENDPOINT = 'https://your-api.com/graphql'

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, any>,
  token?: string
): Promise<T> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  })

  const json = await res.json()

  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'GraphQL Error')
  }

  return json.data
}

#axios
import axios from 'axios'

const GRAPHQL_ENDPOINT = 'https://your-api.com/graphql'

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, any>,
  token?: string
): Promise<T> {
  const response = await axios.post(
    GRAPHQL_ENDPOINT,
    { query, variables },
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  )

  if (response.data.errors) {
    throw new Error(response.data.errors[0]?.message || 'GraphQL Error')
  }

  return response.data.data
}
