import { api } from '@/lib/api'
import { createServerFn } from '@tanstack/react-start'

interface User {
  id: number
  name: string
  email: string
}

// Pour l'instant on utilise JSONPlaceholder pour tester
// Remplace par ton API Laravel quand elle sera prête
export const getUsers = createServerFn().handler(async () => {
  try {
    const { data } = await api.get<User[]>(
      'https://jsonplaceholder.typicode.com/users',
    )
    return data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }))
  } catch (error) {
    console.error(error)
  }
})
