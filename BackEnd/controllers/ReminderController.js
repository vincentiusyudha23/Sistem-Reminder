import Reminder from "../models/ReminderModel.js";
import ListNotes from "../models/ListNotesModel.js";

export const getReminder = async (req, res) => {
    try {
        const response = await Reminder.findAll({
            include: [{ model: ListNotes }]
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getReminderById = async (req, res) => {
    try {
        const response = await Reminder.findOne({
            include: [
                { model: ListNotes }
            ],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const createReminder = async (req, res) => {
    try {
        await Reminder.create(req.body);
        res.status(201).json({ msg: 'Reminder Created' });
    } catch (error) {
        console.log(error.message);
    }
}
export const updateReminder = async (req, res) => {
    try {
        await Reminder.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: 'Reminder Updated' });
    } catch (error) {
        console.log(error.message);
    }
}
export const deleteReminder = async (req, res) => {
    try {
        await Reminder.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: 'Reminder Deleted' });
    } catch (error) {
        console.log(error.message);
    }
}