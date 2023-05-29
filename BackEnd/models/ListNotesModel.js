import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Reminder from "./ReminderModel.js";

const { DataTypes } = Sequelize;

const ListNotes = db.define('listnotes', {
    waktu: DataTypes.TIME,
    notes: DataTypes.STRING,
}, {
    freezeTableName: true
});

Reminder.hasMany(ListNotes);
ListNotes.belongsTo(Reminder);

export default ListNotes;

(async () => {
    await db.sync();
})();