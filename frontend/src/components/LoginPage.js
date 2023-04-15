import axios from 'axios'
import React, { useState } from 'react'
import { domain } from '../env'


const LoginPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    const loginRequest = async () => {
        await axios({
            method: 'post',
            url: `${domain}/api/login/`,
            data: {
                'username': username,
                'password': password
            }
        }).then(response => {
            localStorage.setItem('token', JSON.stringify(response.data['token']))
            window.location.href = "/"
        }).catch(_ => {
            alert("Username or Password is Invalid...")
        })
    }

    return (
        <div className='container my-5'>
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className='px-3 px-md-5 py-4 border'>
                        <h2 className="text-center fs-4 fw-medium mb-4">Login Here</h2>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Enter Password" />
                        </div>

                        <button onClick={loginRequest} type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginPage