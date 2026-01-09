import axios from 'axios'

// Create axios instance for MCP User backend
export const mcpUserClient = axios.create({
  baseURL: process.env.MCP_USER_URL || 'http://localhost:8000/mcp/user',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

//  Add interceptors to user client
// mcpUserClient.interceptors.request.use(
//   (config) => {
//     console.log(
//       '🚀 MCP User Request:',
//       config.method?.toUpperCase(),
//       config.url,
//     )
//     return config
//   },
//   (error) => {
//     console.error('❌ MCP User Request Error:', error)
//     return Promise.reject(error)
//   },
// )

// mcpUserClient.interceptors.response.use(
//   (response) => {
//     console.log('✅ MCP User Response:', response.status, response.data)
//     return response
//   },
//   (error) => {
//     console.error(
//       '❌ MCP User Response Error:',
//       error.response?.status,
//       error.message,
//     )
//     return Promise.reject(error)
//   },
// )

// General purpose axios instance for other APIs
export const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
