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



import { Component } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
// import Editor from 'react-native-mentions-editor';
import Editor from 'react-medium-editor';


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




const client = new WebSocket('ws://127.0.0.1:8000');
const contentDefaultMessage = "Start writing your document here";


class AppChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsers: [],
      userActivity: [],
      username: null,
      text: ''
    };
  }

  logInUser = () => {
    const username = this.username.value;
    if (username.trim()) {
      const data = {
        username
      };
      this.setState({
        ...data
      }, () => {
        client.send(JSON.stringify({
          ...data,
          type: "userevent"
        }));
      });
    }
  }


  setDataMessage = (e) => {
    if (e.code === 'Enter') {
      // console.log(document.getElementById("inpMessageUser").value);
      let historialMessages = document.getElementById("txtHistorialMessages").innerHTML

      let mensajeUsuario = document.getElementById("inpMessageUser").value;

      console.log('historialMessages')
      console.log(historialMessages)
      var auxP = document.createElement("p");

      if(historialMessages != ""){
        // document.getElementById("txtHistorialMessages").innerHTML = historialMessages + newP.innerText
        
        var newDiv = document.createElement("br");
        var newBr = document.createElement("br");
        var newP = document.createElement("p");
        var newContent = document.createTextNode(historialMessages + auxP.innerText + mensajeUsuario);
        newP.appendChild(newContent);
        
        
      } else {
        var newP = document.createElement("p");
        var newContent = document.createTextNode(mensajeUsuario);
        newP.appendChild(newContent);
        
      }
      
      this.onEditorStateChange(newP.innerHTML+ " | ");
    }
  }
  /* When content changes, we send the
current content of the editor to the server. */
  onEditorStateChange = (text) => {
    console.log(text)
    
    client.send(JSON.stringify({
      type: "contentchange",
      username: this.state.username,
      content: text
    }));
    


  };

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const stateToChange = {};
      if (dataFromServer.type === "userevent") {
        stateToChange.currentUsers = Object.values(dataFromServer.data.users);
      } else if (dataFromServer.type === "contentchange") {
        stateToChange.text = dataFromServer.data.editorContent || contentDefaultMessage;
      }
      stateToChange.userActivity = dataFromServer.data.userActivity;
      this.setState({
        ...stateToChange
      });
    };
  }

  showLoginSection = () => (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__profile">
            {/* <Identicon className="account__avatar" size={64} string="randomness" /> */}
            <p className="account__name">Hello, user!</p>
            <p className="account__sub">Join to edit the document</p>
          </div>
          <input name="username" ref={(input) => { this.username = input; }} className="form-control" />
          <button type="button" onClick={() => this.logInUser()} className="btn btn-primary account__btn">Join</button>
        </div>
      </div>
    </div>
  )


  showEditorSection = () => (
    <div className="main-content">
      <div className="document-holder">
        <div className="currentusers">
          {this.state.currentUsers.map(user => (
            <React.Fragment>
              <span id={user.username} className="userInfo" key={user.username}>
                {/* <Identicon className="account__avatar" style={{ backgroundColor: user.randomcolor }} size={40} string={user.username} /> */}
                <p>{user.username}</p>
              </span>
              {/* <UncontrolledTooltip placement="top" target={user.username}>
              {user.username}
            </UncontrolledTooltip> */}
            </React.Fragment>
          ))}
        </div>

          <div id='HistorialMensages'></div>


        <Editor
          options={{
            placeholder: {
              text: this.state.text ? contentDefaultMessage : ""
            }
          }}
          id="txtHistorialMessages"
          className="body-editor"
          text={this.state.text}
          onChange={this.onEditorStateChange}
        />

        {/* <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Empty"
          style={{ width: 200 }}

          options={{
            placeholder: {
              text: this.state.text ? contentDefaultMessage : ""
            }
          }}
          id="txtHistorialMessages"
          className="body-editor"
          text={this.state.text}
          onChange={this.onEditorStateChange}
        /> */}

        <span>Escribe tu mensaje</span>
        <Input type="text" options={{
          placeholder: {
            text: this.state.text ? contentDefaultMessage : ""
          }
        }}
          className="body-editor"
          // text={this.state.text}
          id="inpMessageUser"
          onKeyUp={this.setDataMessage} />
      </div>
      <div className="history-holder">
        <ul>
          {this.state.userActivity.map((activity, index) => <li key={`activity-${index}`}>{activity}</li>)}
        </ul>
      </div>
    </div>
  )

  render() {
    const {
      username
    } = this.state;
    return (
      <React.Fragment>
        {/* <Navbar color="light" light>
        <NavbarBrand href="/">Real-time document editor</NavbarBrand>
      </Navbar> */}
        <div className="container-fluid">
          {username ? this.showEditorSection() : this.showLoginSection()}
        </div>
      </React.Fragment>
    );
  }





}

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };






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
            <AppChat />
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
            <ListItemText primary="Location" secondary="Av Corregidora, 3345, Monterrey Nuevo Le??n" sx={{ textAlign: 'center' }} />
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
