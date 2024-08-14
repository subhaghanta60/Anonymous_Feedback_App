import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a singal string.Each Question should be seperated by ||";
  
    const result = await streamText({
      model: openai('gpt-4-turbo'),
      prompt,
    });
  
    return result.toDataStreamResponse();
  } catch (error) {
    
      console.error("An Unexpeed Error occur")
      throw error
    }
    
  }
