import express from "express";
import cors from "cors";
import Reminder from "./routes/ReminderRoute.js";
import ListNotes from "./routes/ListNotesRoute.js";
import moment from 'moment-timezone';


const app = express();
app.use(cors());
app.use(express.json());
app.use(Reminder);
app.use(ListNotes);

moment.tz.setDefault('Asia/Jakarta');

app.listen(5000, () => console.log('Server Berjalan...'));