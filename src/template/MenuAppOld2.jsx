import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

// Custom views
import GaleryArticulos from '../index/GaleryArticulos'








const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const { search } = Input;
const { Text } = Typography;
let historialMensajes = [];

let state = {
  userName: '',
  isLoggedIn: false,
  messages: []
}
let initChat = false;

const setLoginData = () => {
  let UserChat = document.getElementById("inpUsernameChat").value
  
  state.userName = UserChat
  state.isLoggedIn = true
  document.getElementById("pNombreUsuario").innerHTML = UserChat
  console.log(state)
}

const setInitChat = () => {
  initChat = true;
  document.getElementById("contentInitChat").style.display = "none"
  document.getElementById("contentChat").style.display = "block"
}


// setInterval(() => {
// console.log("escuchando")
// client.onopen = () => {
//   console.log('Client conected')
// }
// client.onmessage = (message) => {
//   const dataFromServer = JSON.parse(message.data)
//   console.log(`Got reply ${dataFromServer.msg}`)

//   if (dataFromServer.type === "message") {
//     // state.message.push(dataFromServer.msg)
//     // console.log(state.message)
//     historialMensajes.push(dataFromServer.msg)
//     console.log(historialMensajes)
//     client.close = (e) => {
//       // connection closed
//       console.log(e.code, e.reason);
//     };
//     // setState((state) => ({
//     //   message: [...state.message,
//     //   {
//     //     msg: dataFromServer.msg,
//     //     user: dataFromServer.user
//     //   }]
//     // }))
//   }
// }
// }, 1000);



var client = new WebSocket('ws://127.0.0.1:8000');

// Variables
const miWebSocket = new WebSocket('ws://127.0.0.1:8000');
const miNuevoMensaje = document.getElementById('#nuevo-mensaje');

// Funciones
function open() {
  // Abre conexión
  console.log("WebSocket abierto.");
}

async function message(evento) {
  let misRespuestas = document.getElementById("respuestas");

  // Se recibe un mensaje
  console.log("WebSocket ha recibido un mensaje");
  // Mostrar mensaje en HTML
  console.log(evento)
  console.log(evento.data)
  const mensajeRecibido = await evento.data; // Arreglo para Node ya que devuelve Blob. Solo con 'evento.data' debería ser suficient
  console.log(misRespuestas)
  misRespuestas.innerHTML = misRespuestas.innerHTML.concat(mensajeRecibido, '<br>');
}

function error(evento) {
  // Ha ocurrido un error
  console.error("WebSocket ha observado un error: ", evento);
}

function close() {
  // Cierra la conexión
  console.log("WebSocket cerrado.");
}

function enviarNuevoMensaje(evento) {
  // Evento tecla Enter
  if (evento.code === 'Enter') {
    // Envia mensaje por WebSockets
    miWebSocket.send(miNuevoMensaje.value);
    // Borra texto en el input
    miNuevoMensaje.value = '';
  }
}

// Eventos de WebSocket
miWebSocket.addEventListener('open', open);
miWebSocket.addEventListener('message', message);
miWebSocket.addEventListener('error', error);
miWebSocket.addEventListener('close', close);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onButtonClicked = () => {
    miWebSocket.send(document.getElementById("inpMessageUser").value);
    // Borra texto en el input
    document.getElementById("inpMessageUser").value = '';
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            App store
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Products', 'Best Sellers', 'My shopping'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {['Item', 'Item 2', 'Item 3'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Articulos
        </Typography>
        <Typography paragraph>
          This store was created by only noobs :P
        </Typography>



        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 0,
            pb: 1,
          }}
        >
          <Container maxWidth="sm">
            <div id='contentChat'>

              <div className='content-chat'>
                <div className="title">
                  <p id='pNombreUsuario'></p>
                  {/* <Text type="secondary" style="{{fontSize:'36px'}}">WebSocket chat</Text> */}
                </div>

                {/* <input type="text" id="nuevo-mensaje" onKeyUp={enviarNuevoMensaje(event)}/> */}


                <hr />
                <input type="text" placeholder='Message' size="large" id="inpMessageUser" className='inp-mensaje' />


                <Button onClick={onButtonClicked} className='btn-send-message'>Send message</Button>
                {/* {state.messages.map(msg => <p>Message: {msg.msg}, user:{msg.user}</p>)} */}
                <div id="respuestas"></div>
              </div>
            </div>
            <div id='contentInitChat' className='content-chat'>
              <input type="text" placeholder='Enter username' size="large" onChange={setLoginData} id="inpUsernameChat" className='inp-mensaje' />

              <Button variant="contained" type="submit" onClick={setInitChat} className='btn-send-message'>Join chat</Button>
              {/* <Search
                            placeholder="Enter Username"
                            enterButton="Login"
                            size="large"
                            onSearch={value => this.setState({ isLoggedIn: true, userName: value })}
                        /> */}
            </div>
          </Container>

        </Box>




        <GaleryArticulos></GaleryArticulos>

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
      </Box>
    </Box>
  );
}
