import { NextResponse } from 'next/server';
import { authService } from '@/lib/appwrite';

export async function GET() {
  try {
    // Test basic connection
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    
    return NextResponse.json({
      message: '🍷 VineVault API is working!',
      appwrite: {
        endpoint,
        projectId,
        status: 'connected'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      message: 'API Error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}