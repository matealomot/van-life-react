import { useLoaderData, Form, useActionData, useNavigation } from "react-router-dom";
import { loginUser } from "../utilities/UtilityFunctions";
import {redirect} from '../utilities/addOnUtilities'
import '../css/Login.css';


export function loader({ request }) {
	return new URL(request.url).searchParams.get("message")
};

export async function action({request}) {
	const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
    
	try {
		if(!JSON.parse(localStorage.getItem('loggedin'))) {
			const formData = await request.formData();
			const email = formData.get('email');
			const password = formData.get('password');
			const data = await loginUser({email, password});
			localStorage.setItem('loggedin', true)
			
			return redirect(pathname);
		}
		else {
			return redirect("/login?message=You are already signed in.");
		}
	}
	catch(err) {
		return err.message
	}
};

export default function Login() {
	const message = useLoaderData();
	const error = useActionData();
	const naviagtion = useNavigation();

	return (
		<div className="login-container">
			<h1>Sign in to your account</h1>
			{message && <h2 className="red">{message}</h2>}
			{error && <h2 className="red">{error}</h2>}
			<Form method="post" className="login-form" replace>
				<input
					name="email"
					type="email"
					placeholder="Email address"
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
				/>
				<button 
					disabled={naviagtion.state === 'submitting'}
					className={naviagtion.state === 'submitting' ? 'disabled' : ''}
				>
					{naviagtion.state === 'submitting' ? 'Logging in...' : 'Log in'}
				</button>
			</Form>
		</div>
	);
};
