import express from "express";

import { getListNotes, createListNotes } from "../controllers/ListNotesController.js";

const router = express.Router();

router.get('/listnotes', getListNotes);
router.post('/listnotes', createListNotes);

export default router;