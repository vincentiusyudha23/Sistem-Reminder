import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import BoxDate from './components/BoxDate'
import axios from 'axios'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


function App() {
  const [reminders, setReminders] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      getReminder();
    }, 500);

    return () => {
      clearInterval(interval);
    }
  }, [])

  const getReminder = async () => {
    const response = await axios.get('http://localhost:5000/reminder');
    setReminders(response.data);
  }



  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ paddingTop: 5 }}>
        {reminders.length === 0 ? (
          <Box sx={{
            width: 200,
            height: 200,
            borderRadius: 5,
            backgroundColor: '#b1b3b5'
          }} display="flex" alignItems="center">
            <Typography variant='h5' align='center' fontWeight='700' color='white'>
              Belum Ada Reminder
            </Typography>
          </Box>
        ) : (
          <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
            {
              reminders.map((reminder, index) => (
                <BoxDate key={reminder.id} tanggal={reminder.tanggal} reminderid={reminder.id} />
              ))
            }
          </Stack>
        )}
      </Container>
    </>
  )
}

export default App
