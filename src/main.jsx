import React from 'react'
import ReactDOM from 'react-dom/client'

import MenuApp from './template/MenuApp'
import MenuApp2 from './template/MenuApp'
import Footer from './template/Footer'
import GaleryArticulos from './index/GaleryArticulos'
import './index.css'
import Button from '@mui/material/Button';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MenuApp2 />
    

    {/* <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer> */}

    {/* <Footer /> */}

  </React.StrictMode>
)


