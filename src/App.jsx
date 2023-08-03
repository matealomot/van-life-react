import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './Home.jsx';
import About from './About.jsx';
import Vans from './Vanslist.jsx';
import Van from './Van.jsx';
import './App.css'
import './server.js';


function App() {

  return (
    <BrowserRouter>
      <header>
        <Link to='/' className='site-logo'>#VANLIFE</Link>
        <nav>
          <Link to='/About'>About</Link>
          <Link to='/Vans'>Vans</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='About' element={<About />}/>
        <Route path='Vans' element={<Vans />}/>
        <Route path='/vans/:id' element={<Van />}/>
        {/* Whatever is written in place of :id in the path will read as part of the path; :id is just a placeholder, like a parameter or variable name;            ":" indicates a variable parameter */}
      </Routes>

      <footer>
        Ⓒ 2022 #VANLIFE
      </footer>
    </BrowserRouter>
  )
}

export default App
