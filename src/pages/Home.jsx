import '../css/App.css';
import { Link } from 'react-router-dom';

export default function Home() {
	return(
		<div className="home-container">
			<div className="home-elements">
				<h1>You got the travel plans, we got the travel vans.</h1>
				<p>Add adventure to your life by joining the #vanlife movement.</p>
				<p>Rent the perfect van to make your perfect road trip.</p>
				<Link to="vans" className='link-to-vans'>Find your van</Link>
			</div>
		</div>
	);
};