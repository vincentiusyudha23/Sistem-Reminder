import { Sequelize } from "sequelize";
import db from "../config/database.js";


const { DataTypes } = Sequelize;

const Reminder = db.define('reminder', {
    tanggal: DataTypes.DATE,
}, {
    freezeTableName: true
});

export default Reminder;

(async () => {
    await db.sync();
})();