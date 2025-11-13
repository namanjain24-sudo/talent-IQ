import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET || 'your-default-jwt-secret',
    JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH || process.env.JWT_SECRET || 'your-default-jwt-refresh-secret',
    JWT_EXPIRE: process.env.JWT_EXPIRE || '15m',
    JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d'
};