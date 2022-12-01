import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';

const { search } = Input;
const { Text } = Typography;

// var ws = new WebSocket('ws://127.0.0.1:8000');
// ws = new WebSocket("ws://localhost:8080/websocket/wsserver");
// ws.onopen = () => {
//     // console.log('Conected')
//     // connection opened
//     // ws.send('Hello');  // send a message
// };

export default function Footer() {
    state = {
        userName: '',
        isLoggedIn: false,
        messages: []
    }

    return (
        <>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper'
                }}
            >
                <Divider component="li" />
                <li>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            pt: 8,
                            pb: 6,
                        }}
                    >
                        <div>
                    
                            <p>Chat</p>
                        </div>
                    </Box>
                    <Typography
                        sx={{ mt: 0.5, ml: 2 }}
                        color="text.secondary"
                        display="block"
                        variant="caption"
                    >

                    </Typography>
                </li>
                <ListItem>
                    <ListItemText primary="Location" secondary="Av Corregidora, 3345, Monterrey Nuevo León" sx={{ textAlign: 'center' }} />
                </ListItem>
                <Divider component="li" />
                <li>
                    <Typography
                        sx={{ mt: 0.5, ml: 2 }}
                        color="text.secondary"
                        display="block"
                        variant="caption"
                    >

                    </Typography>
                </li>
                <ListItem>
                    <ListItemText primary="Phone" secondary="9988776655" sx={{ textAlign: 'center' }} />
                </ListItem>
                <Divider component="li" />
                <li>
                    <Typography
                        sx={{ mt: 0.5, ml: 2 }}
                        color="text.secondary"
                        display="block"
                        variant="caption"
                    >

                    </Typography>
                </li>
                <ListItem>
                    <ListItemText primary="E-mail" secondary="contact@mail.com" sx={{ textAlign: 'center' }} />
                </ListItem>
                <Divider component="li" />
                <li>
                    <Typography
                        sx={{ mt: 0.5, ml: 2 }}
                        color="text.secondary"
                        display="block"
                        variant="caption"
                    >

                    </Typography>
                </li>
            </List>
        </>
    )
}