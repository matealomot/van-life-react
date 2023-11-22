import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import { requireAuth } from './utilities/UtilityFunctions.js';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Login, {loader as loginLoader, action as loginAction} from './pages/Login.jsx';
import Vans, {loader as vansLoader} from './pages/vans/Vanslist.jsx';
import Van, {loader as vanLoader} from './pages/vans/Van.jsx';
import HostLayout from './HostLayout.jsx';
import Dashboard from './pages/host/Dashboard.jsx';
import Income from './pages/host/Income.jsx';
import ListedVans, {loader as listedVansLoader} from './pages/host/ListedVans.jsx';
import Reviews from './pages/host/Reviews.jsx';
import Listing, {loader as listingLoader} from './pages/host/Listing.jsx';
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
    <Route path='login' element={<Login />} loader={loginLoader} action={loginAction}/>
    <Route path='vans' element={<Vans />} errorElement={<ErrorElement />} loader={vansLoader}/>
    <Route path='vans/:id' element={<Van />} loader={vanLoader}/>

    <Route path='host' element={<HostLayout />}> {/*This is the parent route*/}
      <Route index element={<Dashboard />} loader={async ({request}) => await requireAuth(request)}/>
      <Route path='income' element={<Income />} loader={async ({request}) => await requireAuth(request)}/>
      <Route path='listed' element={<ListedVans />} loader={listedVansLoader} errorElement={<ErrorElement/>}/>

      <Route path='listed/:id' element={<Listing />} loader={listingLoader}>
          <Route index element={<Details />} loader={async ({request}) => await requireAuth(request)}/>
          <Route path='pricing' element={<Pricing />} loader={async ({request}) => await requireAuth(request)}/>
          <Route path='photos' element={<Photos />} loader={async ({request}) => await requireAuth(request)}/>
      </Route>
      
      <Route path='reviews' element={<Reviews />} loader={async ({request}) => await requireAuth(request)}/>
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
