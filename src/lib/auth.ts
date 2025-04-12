import { readDatabase } from './database';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Admin } from '@/types';

// Secret key for JWT (in a real app, use env variable)
const JWT_SECRET = 'aka-portfolio-secret-key';

/**
 * Validate admin credentials
 */
export async function validateCredentials(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const db = await readDatabase();
    return (
      db.admin.username === username && 
      db.admin.password === password
    );
  } catch (error) {
    console.error('Error validating credentials:', error);
    return false;
  }
}

/**
 * Get authenticated user
 */
export async function getAuthenticatedUser(): Promise<Admin | null> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('auth_session');
    
    if (!sessionCookie?.value) {
      return null;
    }
    
    // In a real app, you'd verify the JWT token here
    // For simplicity, we're just checking if the cookie exists
    const db = await readDatabase();
    return db.admin;
  } catch (error) {
    console.error('Error getting authenticated user:', error);
    return null;
  }
}

/**
 * Create authentication session
 */
export function createAuthSession(response: NextResponse): NextResponse {
  // Set a cookie to maintain the session
  // In a real app, you'd use a proper JWT token
  response.cookies.set({
    name: 'auth_session',
    value: 'authenticated',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
  
  return response;
}

/**
 * Clear authentication session
 */
export function clearAuthSession(response: NextResponse): NextResponse {
  response.cookies.set({
    name: 'auth_session',
    value: '',
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  
  return response;
}

/**
 * Check if request is authenticated
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const sessionCookie = request.cookies.get('auth_session');
  return !!sessionCookie?.value;
}

/**
 * Middleware to require authentication
 */
export async function requireAuth(
  request: NextRequest
): Promise<NextResponse | null> {
  const isAuth = await isAuthenticated(request);
  
  if (!isAuth) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }
  
  return null;
}
