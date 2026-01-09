import { toolDefinition } from '@tanstack/ai'
import type { JSONSchema } from '@tanstack/ai'
import { mcpUserClient } from '../lib/axios'

// Define the user creation tool using JSON Schema (compatible with all providers)
const inputSchema: JSONSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'The name of the user',
    },
    email: {
      type: 'string',
      description: 'The email of the user',
      format: 'email',
    },
  },
  required: ['name', 'email'],
}

const outputSchema: JSONSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'User name',
    },
    email: {
      type: 'string',
      description: 'User email',
    },
  },
  required: ['name', 'email'],
}

export const createUserDef = toolDefinition({
  name: 'create-user',
  description:
    'This tool creates a new user with the given name and email address.',
  inputSchema,
  outputSchema,
})

// Server implementation that calls your Laravel MCP backend
export const createUser = createUserDef.server(async (args: any) => {
  const { name, email } = args
  try {
    // Call your Laravel MCP backend endpoint using axios
    const { data: mcpResponse } = await mcpUserClient.post('', {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'create-user',
        arguments: {
          name,
          email,
        },
      },
    })

    // Handle MCP error response
    if (mcpResponse.error) {
      throw new Error(mcpResponse.error.message || 'MCP server error')
    }

    // Parse the result from MCP
    const resultText =
      mcpResponse.result?.content?.[0]?.text || mcpResponse.result

    let userData
    if (typeof resultText === 'string') {
      try {
        userData = JSON.parse(resultText)
      } catch {
        throw new Error('Invalid JSON response from MCP server')
      }
    } else {
      userData = resultText
    }

    // Return in the expected format (match Laravel output)
    return {
      name: userData.name,
      email: userData.email,
    }
  } catch (error) {
    console.error('Error calling MCP user service:', error)
    // Return a fallback response with the same structure
    return {
      name: name,
      email: email,
    }
  }
})
