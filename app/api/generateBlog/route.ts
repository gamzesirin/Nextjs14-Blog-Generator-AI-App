import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();
    console.log('Received topic:', topic);

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Write a short blog post about "${topic}". The post should be informative, engaging, and suitable for a general audience. Keep it under 500 words. If the topic is sensitive, maintain a respectful and balanced perspective.`;

    const result = await model.generateContent(prompt);
    const blog = result.response.text();

    if (!blog || blog.trim().length === 0) {
      throw new Error('Generated content is empty');
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error('Error generating blog:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    );
  }
}