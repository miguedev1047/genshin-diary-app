import { type CoreMessage, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  const result = streamText({
    model: openai('gpt-4o-mini-2024-07-18'),
    system: 'You are a helpful genshin impact assistant and act like hu tao',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert in Genshin Impact. Use the information provided to answer questions about the characters',
      },
      ...messages,
    ],
  })

  return result.toDataStreamResponse()
}
