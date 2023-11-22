import {Link} from 'react-router-dom';
import '../css/PageNotFound.css';

export default function NotFound() {
	return (
		<div className='not--found'>
			<h1>The page you are looking for cannot be found...</h1>
			<Link to='/'>Return to Home</Link>
		</div>
	)
}