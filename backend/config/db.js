import {neon} from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config()

const sql = neon(process.env.DATABASE_URL)
console.log('database url', process.env.DATABASE_URL);

export const testDB = async()=>{
    try {
        const result = await sql`SELECT NOW()`;
        console.log('DB connected', result);
    } catch (error) {
        console.log("error connecting database", error)
    }
}

export default sql;