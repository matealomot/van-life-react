import {Link, Outlet} from 'react-router-dom';
import './HostLayout.css';

export default function HostLayout() {
  return (
    <>
      <nav className='host--layout'>
        <Link to='/host'>Dashboard</Link>
        <Link to='/host/income'>Income</Link>
        <Link to='/host/reviews'>Reviews</Link>
      </nav>
      <Outlet />
    </>
  );
};