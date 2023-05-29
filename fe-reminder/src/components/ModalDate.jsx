import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';


const ModalDate = (props) => {
    const { open, close } = props;
    const [tanggal, setTanggal] = useState('');
    const [error, setError] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();
        if (tanggal === '') {
            setError('Pilih Tanggal Terlebih Dahulu');
            return;
        }

        try {
            await axios.post('http://localhost:5000/reminder', { tanggal });
            setTanggal('');
            setError('');
        } catch (error) {
            console.error('Gagal Membuat Reminder:', error);
        }
    }
    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Add Reminder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSave}>
                    <FormControl sx={{ width: '100%' }} variant="standard">
                        <InputLabel>Date</InputLabel>
                        <Input
                            type='date'
                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                            sx={{ color: 'red' }}
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                        />
                        <Modal.Footer>
                            {error && <p>{error}</p>}
                            <Button variant="primary" onClick={close} type='submit'>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </FormControl>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalDate