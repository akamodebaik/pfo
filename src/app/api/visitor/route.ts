import { NextRequest, NextResponse } from 'next/server';
import { incrementVisitorCount, getVisitorCount } from '@/lib/database';

// GET handler to retrieve visitor count
export async function GET(request: NextRequest) {
  try {
    const count = await getVisitorCount();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Error getting visitor count:', error);
    return NextResponse.json(
      { message: 'Failed to get visitor count' },
      { status: 500 }
    );
  }
}

// POST handler to increment visitor count
export async function POST(request: NextRequest) {
  try {
    const count = await incrementVisitorCount();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return NextResponse.json(
      { message: 'Failed to increment visitor count' },
      { status: 500 }
    );
  }
}
