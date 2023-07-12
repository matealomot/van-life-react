import { useState } from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './Home.jsx';
import About from './About.jsx';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <header>
        <Link to='/' className='site-logo'>#VANLIFE</Link>
        <nav>
          <Link to='/About'>About</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='About' element={<About />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
