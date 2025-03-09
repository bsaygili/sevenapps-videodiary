import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

// Initialize the database asynchronously
export const initDatabase = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('app.db');

        await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL, 
        description TEXT NOT NULL,
        video TEXT NOT NULL
      );
    `);
    }
};

export const insertVideo = async (name: string, description: string, video: string) => {
    if (!db) await initDatabase();
    const result = await db!.runAsync('INSERT INTO videos (name, description, video) VALUES (?, ?, ?)', [name, description, video]);
    return result.lastInsertRowId;
};


export const updateById = async (id: string, name: string, description: string, video: string) => {
    if (!db) await initDatabase();
    await db!.runAsync('UPDATE videos SET name = ?, description = ?, video = ? WHERE id = ?', [name, description, video, id]);
};

export const fetchVideos = async () => {
    if (!db) await initDatabase();
    return await db!.getAllAsync('SELECT * FROM videos');
};

export const deleteVideo = async (id: number) => {
    if (!db) await initDatabase();
    await db!.runAsync('DELETE FROM videos WHERE id = ?', [id]);
};
