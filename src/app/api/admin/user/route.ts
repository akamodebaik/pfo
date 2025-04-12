import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }
    
    // Get authenticated user
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return user data (without password)
    return NextResponse.json(
      { username: user.username },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
