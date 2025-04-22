// src/components/UserList.tsx
import { useEffect, useState } from 'react'
import { graphqlRequest } from '@/graphql/client'
import { GET_USERS } from '@/graphql/queries/getUsers'

export const UserList = () => {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    graphqlRequest<{ users: any[] }>(GET_USERS)
      .then((data) => setUsers(data.users))
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Đang tải...</p>

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}
