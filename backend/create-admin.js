import {neon} from '@neondatabase/serverless';
import bcrypt from 'bcrypt'

const DATABASE_URL = "YOUR_DATABASE_URL";

const sql = neon(DATABASE_URL)
console.log('database url', DATABASE_URL);


async function createAdmin(){
    try {
        const hashedPassword = await bcrypt.hash('123456', 10);
        const [user] = await sql`INSERT INTO users(name, email, password, address, role)
        VALUES ('admin', 'admin@gmail.com', ${hashedPassword}, 'pune', 'ADMIN')`
        console.log(user);
    } catch (error) {
        console.log('got error')
    }
}

createAdmin();
