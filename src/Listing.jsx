import {NavLink, useParams, Outlet} from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Listing() {

  const params = useParams();

  const [van, setVan] = useState(JSON.parse(localStorage.getItem(`ListingDetails${params.id}`)) || null);

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
    .then(result => result.json())
    .then(data => {
      localStorage.setItem(`ListingDetails${params.id}`, JSON.stringify(data.vans));
      setVan(JSON.parse(localStorage.getItem(`ListingDetails${params.id}`)));
    })
    .catch(err => console.log(err));
  }, [params.id])

  
  return (
    <>
      {van ? 
        <>
          <h1>This is one of your listings</h1>
          {/* <Link to='..' relative="path">Back to all vans</Link> */}
          <NavLink to='/host/listed'>Back to all vans</NavLink>

          <div>
            <div>
              <img src={van.imageUrl}></img>
              <h1>{van.name}</h1>
              <p>${van.price}/day</p>
            </div>
          </div>

          <nav className='host--layout'>
            {/* <NavLink style={({isActive}) => isActive ? activeStyle : null} to={`/host/listed/${params.id}`} end >Details</NavLink> */}
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to={`.`} end >Details</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to={`pricing`}>Pricing</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to={`photos`}>Photos</NavLink>
          </nav>
          <Outlet context={[van]}/>
        </>
      : 
        <h2>Loading...</h2>
      }
    </>
  );
};

// relative="path" is a router prop that allows to go back one level in our path, not our route hiararchy  


// I originally created a ListedNav componenet where I added the above navbar and navlinks and added an outlet there, then I just included it in this componenet as <ListedNav /> in place of the current nav bar


// Read about useOutletContext() in Router docs. It's basically context, and allows us to pass data from parent route to children routes