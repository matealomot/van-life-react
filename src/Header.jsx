import {NavLink} from 'react-router-dom';
import loginIcon from './assets/avatar-icon.png';

export default function Header() {

  function removeKey() {
    localStorage.removeItem('loggedin');
  };


  return(
    <header>
      <NavLink to='/' className='site-logo'>#VANLIFE</NavLink>
      <nav>
        <NavLink className={({isActive}) => isActive ? "activeStyle" : null} to='/host'>Host</NavLink>
        <NavLink className={({isActive}) => isActive ? "activeStyle" : null} to='/about'>About</NavLink>
        <NavLink className={({isActive}) => isActive ? "activeStyle" : null} to='/vans'>Vans</NavLink>
        <NavLink className="login-link" to="login"><img src={loginIcon} className="login-icon"/></NavLink>
        <NavLink className="log-out" to='login' onClick={removeKey}>X</NavLink>
      </nav>
    </header>
  );
};
