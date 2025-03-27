import { Sequelize } from 'sequelize'; // Import Sequelize
import dotenv from 'dotenv';
dotenv.config();


let sequelize;

if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL);
} else {
    console.log('Using local database');
    sequelize = new Sequelize(
        process.env.DB_NAME || 'database_name',
        process.env.DB_USER || 'root',
        process.env.DB_PASSWORD || '',
        {
            host: 'localhost',
            dialect: 'postgres'
        },
    );
}