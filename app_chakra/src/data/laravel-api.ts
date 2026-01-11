/**
 * 📡 SERVER FUNCTIONS LARAVEL API
 *
 * Toutes vos requêtes Laravel passent par ce fichier.
 * Utilise Axios pour toutes les requêtes HTTP.
 *
 * 🔧 Pour configurer votre Laravel :
 * 1. Créez un fichier .env à partir de .env.example
 * 2. Changez LARAVEL_API_URL par votre URL Laravel
 * 3. Les Server Functions appellent automatiquement votre backend
 *
 * ✅ Avantages d'Axios vs Fetch :
 * - Gestion automatique des erreurs HTTP
 * - Transformation automatique JSON
 * - Intercepteurs pour les tokens
 * - Timeout configurable
 * - Syntaxe plus simple
 */

import { createServerFn } from '@tanstack/react-start'
import axios from 'axios'

// 🔧 Configuration - Changez ces URLs quand vous aurez votre Laravel
const LARAVEL_API_URL =
  process.env.LARAVEL_API_URL || 'https://jsonplaceholder.typicode.com'
const USERS_API_URL = process.env.USERS_API_URL || 'https://reqres.in/api'

// 🔧 Instance Axios configurée
const api = axios.create({
  baseURL: LARAVEL_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, // 10 secondes
})

const usersApi = axios.create({
  baseURL: USERS_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
})

// 🔒 Intercepteur pour ajouter le token Laravel (si vous en avez un)
// api.interceptors.request.use((config) => {
//   const token = process.env.LARAVEL_API_TOKEN
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// 📦 Types
export type Product = {
  id: number
  title: string
  body: string
  userId: number
}

export type User = {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export type UserDetail = User & {
  fullName: string
}

// ✅ SERVER FUNCTIONS - Toutes vos requêtes Laravel

/**
 * Récupère tous les produits
 * 🔄 Remplacez par : api.get('/api/products')
 */
export const getProducts = createServerFn().handler(async () => {
  // ✅ Axios au lieu de fetch
  const { data } = await api.get<Product[]>('/posts')

  // 🎨 Transformation côté serveur (exemple)
  return data.slice(0, 10).map((product) => ({
    id: product.id,
    name: product.title,
    description: product.body,
    inStock: Math.random() > 0.3, // Simulation
  }))
})

/**
 * Récupère un produit par ID
 * 🔄 Remplacez par : api.get(`/api/products/${id}`)
 */
export const getProductById = createServerFn()
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    // ✅ Axios au lieu de fetch
    const { data } = await api.get<Product>(`/posts/${id}`)

    return {
      id: data.id,
      name: data.title,
      description: data.body,
      inStock: true,
      price: `${(Math.random() * 100 + 10).toFixed(2)}€`,
    }
  })

/**
 * Crée un nouveau produit
 * 🔄 Remplacez par : ${LARAVEL_API_URL}/api/products
 */
export const createProduct = createServerFn()
  .inputValidator((data: { name: string; description: string }) => data)
  .handler(async ({ data }) => {
    // ✅ Axios au lieu de fetch
    const response = await api.post<Product>('/posts', {
      title: data.name,
      body: data.description,
      userId: 1,
    })

    return response.data
  })

/**
 * Met à jour un produit existant (PUT)
 * 🔄 Remplacez par : api.put(`/api/products/${id}`, payload)
 *
 * Note: Server Function = POST, mais Axios fait un PUT vers Laravel
 */
export const updateProduct = createServerFn()
  .inputValidator(
    (data: { id: number; name: string; description: string }) => data,
  )
  .handler(async ({ data }) => {
    // ✅ Axios PUT (remplacement complet du produit)
    const response = await api.put<Product>(`/posts/${data.id}`, {
      title: data.name,
      body: data.description,
      userId: 1,
    })

    return {
      id: response.data.id,
      name: response.data.title,
      description: response.data.body,
      inStock: true,
    }
  })

/**
 * Met à jour partiellement un produit (PATCH)
 * 🔄 Remplacez par : api.patch(`/api/products/${id}`, payload)
 *
 * Note: Server Function = POST, mais Axios fait un PATCH vers Laravel
 */
export const patchProduct = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { id: number; name?: string; description?: string }) => data,
  )
  .handler(async ({ data }) => {
    // ✅ Axios PATCH (mise à jour partielle)
    const payload: any = {}
    if (data.name) payload.title = data.name
    if (data.description) payload.body = data.description

    const response = await api.patch<Product>(`/posts/${data.id}`, payload)

    return {
      id: response.data.id,
      name: response.data.title,
      description: response.data.body,
    }
  })

/**
 * Supprime un produit
 * 🔄 Remplacez par : api.delete(`/api/products/${id}`)
 *
 * Note: Server Function = POST, mais Axios fait un DELETE vers Laravel
 */
export const deleteProduct = createServerFn({ method: 'POST' })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    // ✅ Axios DELETE
    await api.delete(`/posts/${id}`)

    return { success: true, id }
  })

export const getUsers = createServerFn().handler(async () => {
  // ✅ Axios au lieu de fetch
  const { data: json } = await usersApi.get<{ data: User[] }>(
    '/users?per_page=12',
  )

  // 🎨 Transformation côté serveur
  return json.data.map((user) => ({
    id: user.id,
    email: user.email,
    fullName: `${user.first_name} ${user.last_name}`,
    avatar: user.avatar,
    firstName: user.first_name,
    lastName: user.last_name,
  }))
})

/**
 * Récupère un utilisateur par ID
 * 🔄 Remplacez par : usersApi.get(`/api/users/${id}`)
 */
export const getUserById = createServerFn()
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    // ✅ Axios au lieu de fetch
    const { data: json } = await usersApi.get<{ data: User }>(`/users/${id}`)
    const user = json.data

    return {
      id: user.id,
      email: user.email,
      fullName: `${user.first_name} ${user.last_name}`,
      avatar: user.avatar,
      firstName: user.first_name,
      lastName: user.last_name,
    }
  })
