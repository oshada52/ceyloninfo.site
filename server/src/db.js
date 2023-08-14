import pg from 'pg';
import 'dotenv/config';

const connectionString = process.env.DB_URL;

const pool = new pg.Pool({
  connectionString,
});

export default pool;
