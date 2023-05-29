import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ModalDate from './ModalDate';

export default function Navbar() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar position="static" sx={{ backgroundColor: 'red' }}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
                        My Reminder
                    </Typography>
                    <Button variant="contained" sx={{
                        backgroundColor: 'white', color: 'red', '&:hover': {
                            backgroundColor: '#eddfe5'
                        },
                    }} color='secondary' onClick={handleOpen}>
                        Add Reminder
                    </Button>
                </Toolbar>
            </AppBar>
            <ModalDate open={open} close={handleClose} />
        </Box>
    );
}