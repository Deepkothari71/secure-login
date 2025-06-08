import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // TODO: Add your authentication logic here
    // This is where you would typically:
    // 1. Validate credentials against your database
    // 2. Generate JWT or session token
    // 3. Set any necessary cookies

    // For now, returning a mock response
    return NextResponse.json(
      {
        user: {
          id: '1',
          email: email,
          name: 'Test User',
          twoFactorEnabled: false
        },
        token: 'mock-jwt-token'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests (optional, if you want to support GET)
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 