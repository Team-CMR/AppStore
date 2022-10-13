import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function Footer() {
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper'
            }}
        >
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
    )
}