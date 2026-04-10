import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { resumeContext } from '../../data/resume';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = import.meta.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ reply: "I'm currently offline. Please reach out directly at tahmeedhossain@gmail.com!" }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const client = new Anthropic({ apiKey });

    const messages: Anthropic.MessageParam[] = [
      ...history.slice(-6).map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: resumeContext,
      messages,
    });

    const reply = response.content[0].type === 'text' ? response.content[0].text : '';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Chat API error:', err);
    return new Response(
      JSON.stringify({ reply: "Something went wrong. Please try again or contact tahmeedhossain@gmail.com" }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
