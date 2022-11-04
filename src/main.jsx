import React from 'react'
import ReactDOM from 'react-dom/client'
import MenuApp from './template/MenuApp'
import MenuApp2 from './template/MenuApp'
import Footer from './template/Footer'
import GaleryArticulos from './index/GaleryArticulos'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MenuApp2 />
    <GaleryArticulos />
    <Footer />
  </React.StrictMode>
)