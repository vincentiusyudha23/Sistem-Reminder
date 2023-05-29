import ListNotes from "../models/ListNotesModel.js";

export const getListNotes = async (req, res) => {
    try {
        const response = await ListNotes.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};
export const createListNotes = async (req, res) => {
    try {
        const { waktu, notes, reminderId } = req.body;
        const listnote = await ListNotes.create({ waktu, notes, reminderId });
        res.json(listnote);
    } catch (error) {
        console.error('gagal create', error);
        res.status(500).json({ error: 'Server Error' });
    }
};