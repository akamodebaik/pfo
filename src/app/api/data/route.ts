import { NextRequest, NextResponse } from 'next/server';
import { readDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Read the database file
    const data = await readDatabase();
    
    // Return the data as JSON
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { message: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
