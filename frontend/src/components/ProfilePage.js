import React, { useState } from 'react'
import { useGlobalState } from '../state/provider';
import { domain, header } from '../env'
import axios from 'axios'
const ProfilePage = () => {

    const [{ profile }, dispatch] = useGlobalState()

    const [email, setEmail] = useState(profile?.prouser.email)
    const [fname, setFName] = useState(profile?.prouser.first_name)
    const [lname, setLName] = useState(profile?.prouser.last_name)
    const [image, setImage] = useState(null)

    const updateUserHandler = async () => {
        await axios({
            method: 'post',
            url: `${domain}/api/update_user/`,
            headers: header,
            data: {
                "first_name": fname,
                "last_name": lname,
                "email": email
            }
        }).then(res => {
            dispatch({
                type: 'PAGE_RELOAD',
                pagereload: res.data
            })
        })
    }


    const updateUserImage = async () => {
        const formdata = new FormData()
        formdata.append('image', image)
        await axios({
            method: "post",
            url: `${domain}/api/update_user_image/`,
            headers: header,
            data: formdata
        }).then(res => {
            dispatch({
                type: 'PAGE_RELOAD',
                pagereload: res.data
            })
        })
    }

    return (
        <div className='my-5 container'>
            <div className="card card-body p-4">

                <div className="text-center">
                    <img className='rounded-circle object-fit-contain' width={100} height={100} src={`${domain}${profile?.image}`} alt="" />
                    <h2 className="fs-2 fw-bolder mt-4 mb-2">{profile?.prouser.first_name} {profile?.prouser.last_name}</h2>
                    <p className='m-0 fs-4 p-0 text-primary'>@{profile?.prouser.username}</p>
                    <p className='m-0 fs-4 p-0 text-primary'>{profile?.prouser.email}</p>
                </div>

                <div className="w-50 mx-auto my-4">
                    <div className="form-group mb-2">
                        <label htmlFor="image">Upload Image</label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" className="form-control" id="image" />
                    </div>

                    <button onClick={updateUserImage} type="submit" className="btn btn-primary mb-2">Update Image</button>

                    <div className="form-group mb-2">
                        <label htmlFor="f_name">First Name</label>
                        <input onChange={(e) => setFName(e.target.value)} type="text" className="form-control" id="f_name" value={fname} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="l_name">Last Name</label>
                        <input onChange={(e) => setLName(e.target.value)} type="text" className="form-control" id="l_name" value={lname} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" value={email} />
                    </div>

                    <button onClick={updateUserHandler} type="submit" className="btn btn-primary">Update</button>

                </div>

            </div>
        </div>
    )
}

export default ProfilePage