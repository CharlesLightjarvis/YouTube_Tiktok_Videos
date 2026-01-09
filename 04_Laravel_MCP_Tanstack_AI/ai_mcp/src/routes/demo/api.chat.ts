import { createFileRoute } from '@tanstack/react-router'
import { chat, toServerSentEventsResponse } from '@tanstack/ai'
import { geminiText } from '@tanstack/ai-gemini'
import { createUser } from '@/tools/user'

export const Route = createFileRoute('/demo/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const { messages } = await request.json()

        // Create a streaming chat response with Gemini
        const stream = chat({
          adapter: geminiText('gemini-2.5-flash'),
          messages,
          tools: [createUser],
        })

        // Convert to SSE response for the client
        return toServerSentEventsResponse(stream)
      },
    },
  },
})
