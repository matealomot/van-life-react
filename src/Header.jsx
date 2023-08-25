import {NavLink} from 'react-router-dom';

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
