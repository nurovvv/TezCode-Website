const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production' || process.env.DATABASE_URL;

const sequelize = isProduction && process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false,
    })
    : new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '../../data/tezcode.sqlite'),
        logging: false,
    });

module.exports = sequelize;

