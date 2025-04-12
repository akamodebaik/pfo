import { NextRequest, NextResponse } from 'next/server';
import { Language } from '@/types';
import { setLanguage } from '@/lib/i18n';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const language = data.language as Language;
    
    if (!language || (language !== 'en' && language !== 'id')) {
      return NextResponse.json(
        { message: 'Invalid language' },
        { status: 400 }
      );
    }
    
    // Create response
    const response = NextResponse.json(
      { message: 'Language set successfully' },
      { status: 200 }
    );
    
    // Set language cookie
    return setLanguage(language, response);
  } catch (error) {
    console.error('Error setting language:', error);
    return NextResponse.json(
      { message: 'Failed to set language' },
      { status: 500 }
    );
  }
}
