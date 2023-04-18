import React, { useState } from 'react'
import axios from 'axios'
import { domain, header2 } from '../env'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const registerRequest = async () => {
        if (password !== confirmPassword) {
            alert("Two password not matched!!!")
        } else {
            await axios({
                method: 'post',
                url: `${domain}/api/register/`,
                headers: header2,
                data: {
                    "username": username,
                    "password": password,
                }
            }).then(response => {
                alert(response.data.message)
                navigate('/login')
            })
        }
    }


    return (
        <div className='container my-5'>
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className='px-3 px-md-5 py-4 border'>
                        <h2 className="text-center fs-4 fw-medium mb-4">Register Here</h2>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="username" placeholder="Enter username" />

                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Enter Password" />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="confirmpassword">Confirm Password</label>
                            <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" id="confirmpassword" placeholder="Enter Password" />
                        </div>

                        <button onClick={registerRequest} type="submit" className="btn btn-primary">Register</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RegisterPage