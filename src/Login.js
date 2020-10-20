import React, {useState} from "react";
import JoblyApi from "./JoblyApi";
import { useHistory } from 'react-router-dom';
import Alert from "./Alert";
import "./Login.css"

const Login = ({addToken}) => {
    const history = useHistory();
    const [active, setActive] = useState('login');
    const [loginData, setLoginData] = useState({
        username: '',
		password: '',
		first_name: '',
		last_name: '',
		email: '',
		errors: []
    });

    const setLogin = () => {
        setActive('login')
    }

    const setSignup = () => {
        setActive('signup')
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setLoginData(data => ({
            ...data,
            [name]: value
        }))
    }
    async function handleSubmit(e) {
        e.preventDefault();
        let endpoint;
		let data;
		let token;
        if (active === 'signup') {
            data = {
                username: loginData.username,
                password: loginData.password,
                first_name: loginData.first_name || undefined,
                last_name: loginData.last_name || undefined,
                email: loginData.email || undefined
            }
            endpoint = 'register';
        }
        else {
            data = {
                username: loginData.username,
                password: loginData.password
            }
            endpoint = 'login';
        }
        try {
			token = await JoblyApi[endpoint](data);
		} catch (errors) {
			return setLoginData((sign) => ({ ...sign, errors }));
        }
        addToken(token);
        history.push('/jobs');
    }

    return (
         <>
        <div className='container'>
    			<div className='pull-right' style={{marginBottom: "30px"}}>
					<button
						className={`btn btn-primary ${active === 'login' ? 'active' : ''}`}
						onClick={setLogin}>
						Login
					</button>
					<button
						className={`btn btn-primary ${active === 'signup' ? 'active' : ''}`}
						onClick={setSignup}>
						Sign up
					</button>
				</div>

        <div className="Login">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
    <label htmlFor="username">Username</label>
            <input type="text" name="username" className="form-control" placeholder="Username" value={loginData.username} onChange={handleChange} />
        </div>
        <div className="form-group">
        <label htmlFor="password">Password</label>
            <input type="password" name="password" className="form-control" placeholder="Password" value={loginData.password} onChange={handleChange} />
            </div>
            {active === "signup" ? 
            (
                <>
                <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" className="form-control" placeholder="First Name" value={loginData.first_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" className="form-control" placeholder="last Name" value={loginData.lastt_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email"  className="form-control" placeholder="Email" value={loginData.email} onChange={handleChange} />
                </div>
                </>
            )    : ''}      
        
                {loginData.errors.length ? <Alert messages={loginData.errors} /> : null}
                <button type="submit" className="btn btn-default">Submit</button>
                </form>
        </div>
        </div>
    </>
    )
}

export default Login;