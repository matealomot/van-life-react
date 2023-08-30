import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Vans, {loader as vansLoader} from './pages/vans/Vanslist.jsx';
import Van from './pages/vans/Van.jsx';
import HostLayout from './HostLayout.jsx';
import Dashboard from './pages/host/Dashboard.jsx';
import Income from './pages/host/Income.jsx';
import ListedVans from './pages/host/ListedVans.jsx';
import Reviews from './pages/host/Reviews.jsx';
import Listing from './pages/host/Listing.jsx';
import Details from './pages/host/Details.jsx';
import Pricing from './pages/host/Pricing.jsx';
import Photos from './pages/host/Photos.jsx';
import NotFound from './not_found/PageNotFound.jsx';
import ErrorElement from './not_found/ErrorElement.jsx';
import './css/App.css';
import './utilities/server.js';


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path='about' element={<About />}/>
      <Route path='vans' element={<Vans />} errorElement={<ErrorElement />} loader={vansLoader}/>
      <Route path='vans/:id' element={<Van />}/>

      <Route path='host' element={<HostLayout />}>
        <Route index element={<Dashboard />}/>
        <Route path='income' element={<Income />}/>
        <Route path='listed' element={<ListedVans />}/>

        <Route path='listed/:id' element={<Listing />}>
            <Route index element={<Details />}/>
            <Route path='pricing' element={<Pricing />}/>
            <Route path='photos' element={<Photos />}/>
        </Route>
        
        <Route path='reviews' element={<Reviews />}/>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
));


function App() {

  return (
    <RouterProvider router={router}/>
  );
};

export default App;
