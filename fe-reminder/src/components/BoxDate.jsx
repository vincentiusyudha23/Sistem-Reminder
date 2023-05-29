import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from 'react-bootstrap/Modal'
import Stack from '@mui/material/Stack'
import Button from 'react-bootstrap/Button'
import TextField from '@mui/material/TextField'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import moment from 'moment'

const AddlistModal = (props) => {
    const [jam, setJam] = useState('')
    const [note, setNote] = useState('')
    const [error, setError] = useState('')
    const [listreminder, setListReminder] = useState([]);
    useEffect(() => {
        const interval = setInterval(() => {
            getlistreminder();
        }, 500);

        return () => {
            clearInterval(interval);
        }
    }, [])
    const handleSave = async (e) => {
        e.preventDefault();
        if (jam === '') {
            setError('Masukkan Jam!');
            return;
        }
        if (note === '') {
            setError('Masukkan Note!');
            return;
        }

        try {
            await axios.post('http://localhost:5000/listnotes', {
                waktu: jam,
                notes: note,
                reminderId: props.reminderid
            });
            setError('');
            setJam('');
            setNote('');
        } catch (error) {
            console.error('Gagal Membuat Note', error);
        }
    }
    const getlistreminder = async () => {
        const response = await axios.get(`http://localhost:5000/reminder/${props.reminderid}`)
        setListReminder(response.data.listnotes);
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tambahkan Note
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSave}>
                    <Stack direction='row' spacing={8} marginBottom={2}>
                        <Typography variant='h8'>Jam</Typography>
                        <TextField type='time' variant='standard' value={jam} onChange={(e) => setJam(e.target.value)} />
                    </Stack>
                    <Stack direction='row' spacing={8} marginBottom={4}>
                        <Typography variant='h8'>Note</Typography>
                        <TextField variant='standard' fullWidth value={note} onChange={(e) => setNote(e.target.value)} />
                    </Stack>
                    <Typography>{error && <p>{error}</p>}</Typography>
                    <div className='d-flex align-items-end justify-content-end'>
                        <Button type='submit'>Save</Button>
                    </div>
                </Form>
            </Modal.Body>
            <Box sx={{ width: '100%', backgroundColor: 'red' }} color='white' padding={2}>
                <Typography variant='h6' fontWeight={700}>List Notes</Typography>
            </Box>
            <Box padding={12}>
                {listreminder.map((reminder) => (
                    <Stack key={reminder.id} direction="row" spacing={8} marginBottom={2}>
                        <Typography>{reminder.waktu.slice(0, 5)}</Typography>
                        <Typography>{reminder.notes}</Typography>
                    </Stack>
                ))}
            </Box>

        </Modal>
    );
}

const BoxDate = (props) => {
    const { tanggal, reminderid } = props;
    const [open, setOpen] = useState(false);
    const setClose = () => setOpen(false);
    const setShow = () => setOpen(true);

    return (
        <>
            <Box sx={{
                width: 200,
                height: 200,
                borderRadius: 5,
                backgroundColor: 'primary.dark',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                },
            }} display="flex" onClick={setShow} padding={2}>
                <Stack spacing={{ xs: 1, sm: 4 }} direction="row" useFlexGap flexWrap="wrap">
                    <Typography variant='h2' marginTop={2} fontWeight='500' color='white'>
                        {moment(tanggal).format("D")}
                    </Typography>
                    <Typography variant='h4' fontWeight='700' color='white'>
                        {moment(tanggal).format("MMM")}
                    </Typography>
                    <Typography variant='h4' marginLeft={10} fontWeight='700' color='white'>
                        {moment(tanggal).format("dddd").slice(0, 3)}
                    </Typography>
                </Stack>
            </Box>
            <AddlistModal show={open} onHide={setClose} reminderid={reminderid} />
        </>
    )
}

export default BoxDate