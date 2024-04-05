// import React from 'react'

// export default function Login() {
//   return (
//     <div className='p-5 m-5 border-2 rounded'>
//         <div className='ml-32'>Login</div>
//         <form action="" className='mt-3 ml-14'>
//             <label htmlFor="">Email:</label><br />
//             <input type="email" name="email" required className='border-2 rounded hover:border-blue-300'/><br />
//             <label htmlFor="">Password:</label><br />
//             <input type="password" name="password" required className='border-2 rounded hover:border-blue-300'/><br />
//                 <button className='px-2 mt-5 border-2 rounded ml-14 bg-slate-400'>Login</button>
//         </form>
//     </div>
//   )
// }

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const proceedLogin = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.get(`http://localhost:3000/users/${username}`);
                const userData = response.data;
                if (Object.keys(userData).length === 0) {
                    toast.error('Please enter a valid username');
                } else {
                    if (userData.password === password) {
                        toast.success('Login successful');
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('userrole', userData.role);
                        navigate('/');
                    } else {
                        toast.error('Please enter valid credentials');
                    }
                }
            } catch (error) {
                toast.error(`Login failed: ${error.message}`);
            }
        }
    };

    const validate = () => {
        let isValid = true;
        if (!username.trim()) {
            isValid = false;
            toast.warning('Please enter username');
        }
        if (!password.trim()) {
            isValid = false;
            toast.warning('Please enter password');
        }
        return isValid;
    };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={proceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => setUsername(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> |
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
