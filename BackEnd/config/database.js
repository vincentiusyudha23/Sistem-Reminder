import { Sequelize } from "sequelize";

const db = new Sequelize('reminder_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;