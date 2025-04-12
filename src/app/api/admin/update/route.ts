import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { readDatabase, writeDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }
    
    // Get update data
    const updateData = await request.json();
    
    // Get current database
    const currentData = await readDatabase();
    
    // Update database with new data
    const newData = {
      ...currentData,
      ...updateData,
    };
    
    // Write updated data to database
    await writeDatabase(newData);
    
    // Return updated data
    return NextResponse.json(newData, { status: 200 });
  } catch (error) {
    console.error('Error updating database:', error);
    return NextResponse.json(
      { message: 'Failed to update database' },
      { status: 500 }
    );
  }
}
