import {NavLink, Outlet} from 'react-router-dom';
import './HostLayout.css';

export default function HostLayout() {

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  return (
    <>
      <nav className='host--layout'>
        <NavLink style={({isActive}) => isActive ? activeStyle : null} to='/host' end >Dashboard</NavLink> {/* you can also just write '.' for path*/}
        <NavLink style={({isActive}) => isActive ? activeStyle : null} to='income'>Income</NavLink>
        <NavLink style={({isActive}) => isActive ? activeStyle : null} to='listed'>Vans</NavLink>
        <NavLink style={({isActive}) => isActive ? activeStyle : null} to='reviews'>Reviews</NavLink>
      </nav>
      <Outlet />
    </>
  );
};

// "end" is a prop of the NavLink that tells Router to end the matching "here", so in mycase that's at /host. This will prevent situations where a nested route matches, then the parent one matches too because its path is just /host

// 'end' is kinda functionally like a bollean