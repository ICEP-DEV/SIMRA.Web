import React from 'react'
import axios from 'axios'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../Loader/Loader';

function Login() {
    let navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: ""
    });
    const [ButtonPopup, setButtonPopup] = useState(false);
    const handleChangeUpdate = e => {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    //  react hook form start here 


    // set up login button using gmail account
    const onSuccess = async () => {
        if (values.username === "" && values.password === "") {
            console.log("All field should be filled")
            return;
        }
        if (values.username === "") {
            console.log("Enter username")
            return;
        }
        if (values.password === "") {
            console.log("Enter password")
            return;
        }
        setButtonPopup(true)
        const loginData = await axios.post('http://localhost:3001/api/login', values)

        setTimeout(() => {
            
            setButtonPopup(false)
            if (loginData.data.success === true) {
                var userId = loginData.data.results[0].userId

                navigate('/sampling_data', { state: { userId } })
            }
            else {
                console.log(loginData.data.message);
            }


        }, 2000);


        try {

        }
        catch (ex) {

        }
    }
    let displayLoader = <div>

    </div>

    return (
        <div >
            <div className='login template d-flex  justify-content-center align-items-center vh-100 background: #ffffff;'>
                <div className='form_container p-5 bg-white  rounded'>
                    <h3 className='text-center mb-5'><b>SIMRA</b></h3>
                    <h3 className='text-center mb-5'><b>Login here</b></h3>
                    <div className='mb-4'>
                        <label htmlFor='username' className='lables'>Username</label> <br />
                        <input type="username" onChange={handleChangeUpdate} name='username' value={setValues.username} placeholder='Enter Username' className='form-control' />
                        <small>
                            
                        </small>
                    </div>

                    <div className='mb-5'>
                        <label htmlFor='password'>Password</label> <br />
                        <input type="password" onChange={handleChangeUpdate} name='password' value={setValues.password} placeholder='Enter Password' className='form-control' />

                        <small>

                        </small>
                    </div>

                    <Loader trigger={ButtonPopup} setTrigger={setButtonPopup}>
                        {displayLoader}
                    </Loader>
                    <div className='d-grid'>

                        <button className='btn btn-dark' onClick={onSuccess}>Sign In</button>

                    </div>


                    <small>
                        Don't have an account ? <Link to="/signup" className='ms-2'>Sign Up</Link>
                    </small>
                </div>


            </div>
        </div>
    )
}

export default Login
