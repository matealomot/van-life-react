import {NavLink} from 'react-router-dom'; // NavLink can accept a function or variable instead of string in the className attribute

export default function Header() {
  
  return(
    <header>
      <NavLink to='/' className='site-logo'>#VANLIFE</NavLink>
      <nav>
        <NavLink className={({isActive}) => isActive ? "activeStyle" : null} to='/host'>Host</NavLink>
        <NavLink className={({isActive}) => isActive ? "activeStyle" : null} to='/about'>About</NavLink>
        <NavLink className={({isActive}) => isActive ? "activeStyle" : null} to='/vans'>Vans</NavLink>
      </nav>
    </header>
  );
};

// {isActive} is a boolean property from the destructured object that NavLink introduces in the background; we can also instead use obj.isActive