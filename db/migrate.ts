import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
    connectionString: process.env.DB_URL,
});

const db = drizzle(pool);

async function main() {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './db/migrations' });
    console.log('Migrations complete!');
    process.exit(0);
}

main().catch((err) => {
    console.error('Migration failed!', err);
    process.exit(1);
});