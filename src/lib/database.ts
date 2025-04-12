import fs from 'fs';
import path from 'path';
import { Database } from '@/types';

const DB_PATH = path.join(process.cwd(), 'database.json');

/**
 * Read the database file
 */
export async function readDatabase(): Promise<Database> {
  try {
    const data = await fs.promises.readFile(DB_PATH, 'utf8');
    return JSON.parse(data) as Database;
  } catch (error) {
    console.error('Error reading database:', error);
    throw new Error('Failed to read database');
  }
}

/**
 * Write to the database file
 */
export async function writeDatabase(data: Database): Promise<void> {
  try {
    await fs.promises.writeFile(
      DB_PATH,
      JSON.stringify(data, null, 2),
      'utf8'
    );
  } catch (error) {
    console.error('Error writing database:', error);
    throw new Error('Failed to write database');
  }
}

/**
 * Update specific section of the database
 */
export async function updateDatabaseSection<K extends keyof Database>(
  section: K,
  data: Database[K]
): Promise<void> {
  try {
    const db = await readDatabase();
    db[section] = data;
    await writeDatabase(db);
  } catch (error) {
    console.error(`Error updating database section ${String(section)}:`, error);
    throw new Error(`Failed to update ${String(section)}`);
  }
}

/**
 * Increment visitor count
 */
export async function incrementVisitorCount(): Promise<number> {
  try {
    const db = await readDatabase();
    db.stats.visitors += 1;
    db.stats.lastVisited = new Date().toISOString();
    await writeDatabase(db);
    return db.stats.visitors;
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    throw new Error('Failed to update visitor count');
  }
}

/**
 * Get visitor count
 */
export async function getVisitorCount(): Promise<number> {
  try {
    const db = await readDatabase();
    return db.stats.visitors;
  } catch (error) {
    console.error('Error getting visitor count:', error);
    return 0;
  }
}

/**
 * Initialize admin user if it doesn't exist
 */
export async function initializeAdminUser(): Promise<void> {
  try {
    const db = await readDatabase();
    if (!db.admin) {
      db.admin = {
        username: 'admin',
        password: 'akadmin2023'
      };
      await writeDatabase(db);
    }
  } catch (error) {
    console.error('Error initializing admin user:', error);
    throw new Error('Failed to initialize admin user');
  }
}

// Initialize database on startup
export async function initializeDatabase(): Promise<void> {
  try {
    // Check if database file exists
    if (!fs.existsSync(DB_PATH)) {
      // Create initial database file
      const initialData: Database = {
        profile: {
          name: 'Aka',
          fullName: 'Akamaru D. Developer',
          birthdate: '2000-06-15',
          location: 'Jakarta, Indonesia',
          school: 'University of Coding Excellence',
          bio: {
            en: 'Passionate developer focused on creating innovative solutions.',
            id: 'Developer bersemangat yang fokus menciptakan solusi inovatif.'
          },
          avatar: 'https://images.unsplash.com/photo-1503235930437-8c6293ba41f5',
          roles: ['Junior Developer', 'Student', 'Bot Creator'],
          cv: {
            en: '/cv/Aka_CV_EN.pdf',
            id: '/cv/Aka_CV_ID.pdf'
          }
        },
        social: [],
        friends: [],
        projects: [],
        updates: [],
        donations: [],
        admin: {
          username: 'admin',
          password: 'akadmin2023'
        },
        stats: {
          visitors: 0,
          lastVisited: null
        }
      };
      
      await writeDatabase(initialData);
    }
    
    await initializeAdminUser();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw new Error('Failed to initialize database');
  }
}
