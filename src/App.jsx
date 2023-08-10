import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import Vans from './Vanslist.jsx';
import Van from './Van.jsx';
import HostLayout from './HostLayout.jsx';
import Dashboard from './Dashboard.jsx';
import Income from './Income.jsx';
import Reviews from './Reviews.jsx';
import './App.css';
import './server.js';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}> {/*The parent route of the nested routes that contains just the portion of the UI that will be shared.*/}
          <Route index element={<Home />}/> {/*Index routes render in their parent route's outlet at the parent route's path, like a default route component*/}
          <Route path='about' element={<About />}/>
          <Route path='vans' element={<Vans />}/>
          <Route path='vans/:id' element={<Van />}/>

          <Route path='host' element={<HostLayout />}> {/*This is the parent route*/}
            <Route index element={<Dashboard />}/>
            <Route path='income' element={<Income />}/> {/*This is the child route. Child routes are always relative to the parent so we don't need "/"*/}
            <Route path='reviews' element={<Reviews />}/>
          </Route>
        </Route>
      {/* Whatever is written in place of :id in the path will read as part of the path; :id is just a placeholder, like a parameter or variable name;            ":" indicates a variable parameter */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// If you don't want a route to have shared UI from the Layout route, just move it out of the Layout route!

// Nesting routes is useful and should be done primairly in cases parts of UI are supposed to be shared between child componenets, otherwise it's not necessary
