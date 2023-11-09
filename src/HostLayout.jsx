import {NavLink, Outlet} from 'react-router-dom';
import './css/HostLayout.css';

export default function HostLayout() {

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  return (
    <>
      <nav className='host--layout'>
        <NavLink style={({isActive}) => isActive ? activeStyle : null} to='/host' end >Dashboard</NavLink>
        <NavLink style={({isActive}) => isActive ? activeStyle : null} to='income'>Income</NavLink>
        <NavLink style={({isActive}) => isActive ? activeStyle : null} to='listed'>Vans</NavLink>
        <NavLink style={({isActive}) => isActive ? activeStyle : null} to='reviews'>Reviews</NavLink>
      </nav>
      <Outlet />
    </>
  );
};
