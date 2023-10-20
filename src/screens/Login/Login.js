import React from 'react'
import axios from 'axios'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import logo from './logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { user_details } from "../../Redux/user";
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Register from '../Registration/Registration'
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    let user_info = useSelector((state) => state.use)
    const dispatch = useDispatch();


    let [RegisterPopUp, setRegisterPopUp] = useState(false);
    let navigate = useNavigate();
    const [ButtonPopup, setButtonPopup] = useState(false);
    // Register state variables
    const [Email, setEmail] = useState('')
    const [Firstname, setFirstname] = useState('')
    const [Lastname, setLastname] = useState('')
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [Password, setPassword] = useState('')
    const [RePassword, setRePassword] = useState('')
    const [Level, setLevel] = useState('')



    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const handleChangeUpdate = e => {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // set up login button using gmail account
    const onSuccess = async () => {
        if (values.username === "" && values.password === "") {
            console.log("All field should be filled")
            toast.warn("All field should be filled!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (values.username === "") {
            console.log("Enter username");
            toast.warn("Enter username!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (values.password === "") {
            console.log("Enter password");
            toast.warn("Enter password!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            return;
        }

        setButtonPopup(true)
        const loginData = await axios.post('http://localhost:3001/api/login', values)
        setTimeout(() => {
            setButtonPopup(false)
            if (loginData.data.success === true) {
                user_info = {
                    userId: loginData.data.results[0].userId,
                    user_role: loginData.data.results[0].role,
                    user_level: loginData.data.results[0].level,
                    user_initial: loginData.data.results[0].firstname.substring(0, 1).toUpperCase(),
                    user_firstname: loginData.data.results[0].firstname,
                    user_lastname: loginData.data.results[0].lastname,
                    user_mobileNo: loginData.data.results[0].mobileNo,
                    user_role: loginData.data.results[0].role,
                    user_password: loginData.data.results[0].password,
                }
                console.log(loginData.data.results[0])
                console.log(user_info)
                dispatch(user_details(user_info))

                if (loginData.data.results[0].role === "user") {
                    navigate('/home')
                }
                else if (loginData.data.results[0].role === "municipal") {
                    navigate('/municipality')
                }

            }
            else {
                toast.warn(loginData.data.message + "!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log(loginData.data.message);
            }


        }, 2000);


        try {

        }
        catch (ex) {

        }
    }
    let displayLoader = <div></div>
    // let displaySidebar=<div></div>

    function handleRegistration(){
        console.log(Email,Firstname,Lastname,PhoneNumber,Password, RePassword, Level)
    }


    // pop up modal fucntions
    const [isShow, invokeModal] = React.useState(false)
    const initModal = () => {
        return invokeModal(!false)
    }
    const [invokeModals] = React.useState(false)
    const initModals = () => {
        return invokeModals(!false)
    }
    const modalClose = () => {
        return invokeModal(false)
    }

    const [isShowsing, invokeModalsing] = React.useState(false)
    const initModalsing = () => {
        return invokeModalsing(!false)
    }
    const modalClosesing = () => {
        return invokeModalsing(false)
    }

    let RegisterForm = <div>
        <div className='register-form'>
            <h3 className='header-txt'><b>Create An Account</b></h3>
            <div className='form-group'>
                <label>First Name:</label>
                <input type="text" className='control-form' onChange={(event) => setFirstname(event.target.value)} />
            </div>
            <div className='form-group'>
                <label>Last Name:</label>
                <input type="text" className="control-form" onChange={(event) => setLastname(event.target.value)} />
            </div>
            <div className='form-group'>
                <label>Email:</label>
                <input type="email" className="control-form" onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className='form-group'>
                <label>Mobile Number:</label>
                <input type="number" className="control-form" onChange={(event) => setPhoneNumber(event.target.value)} />
            </div>
            <div className='form-group'>
                <label>Password:</label>
                <input type="password" className="control-form" onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className='form-group'>
                <label>Confirm Password:</label>
                <input type="password" className="control-form" onChange={(event) => setRePassword(event.target.value)} />
            </div>
            <div className='form-group'>

                <label> User Level:</label>
                <select className='select-sampling_data control-form' onChange={(event) => setLevel(event.target.value)} >
                    <option value='' className="control-form" disabled selected>---Select---</option>
                    <option value='1' className="control-form">Level One (Household)</option>
                    <option value='2' className="control-form">Level Two (Intermediate)</option>
                    <option value='3' className="control-form">Level Three (Expert)</option>
                </select>

            </div>


            <button className='btn-reg' title="Register" onClick={handleRegistration}>Create Account</button>


        </div>
    </div>

    return (
        <div className='all-contents'>
            <ToastContainer />
            {/*
                            All field should be filled
                */}

            <Modal show={isShow} onHide={modalClose} >
                <Modal.Header closeButton onClick={modalClose}>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    All field should be filled

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="danger" onClick={initModal}>
                            Close
                        </Button> */}
                    <Button variant="dark" onClick={modalClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* data results pop up */}

            <Modal show={isShow} onHide={modalClose} >
                <Modal.Header closeButton onClick={modalClose}>
                    <Modal.Title>login</Modal.Title>
                </Modal.Header>
                <Modal.Body>



                    Enter username

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="danger" onClick={initModal}>
                            Close
                        </Button> */}
                    <Button variant="dark" onClick={modalClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* password pop up */}
            <Modal show={isShowsing} onHide={modalClosesing} >
                <Modal.Header closeButton onClick={modalClosesing}>
                    <Modal.Title>login</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    Enter password

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={modalClosesing}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='login-container'>
                <div className='welcome'>
                    <div className='logo-login'>
                        <img src={logo} alt='logo' /> Simra
                    </div>
                    <h1>Welcome</h1>
                    SIMRA, tool integrates  <br></br>
                    the current water and <br></br>
                    sanitation risk assessment <br></br>
                    and management methods <br></br>
                    into one harmonised tool<br></br>
                </div>
                <div className='login-card'>

                    <div className='main-login' id='main-login'>

                        {/* <h3 className='text-center mb-5'><b>SIMRA</b></h3> */}
                        <h3 className='header-txt'><b>Login </b></h3>
                        <div className='mb-4'>
                            {/* <label htmlFor='username' className='lables'>Username</label> <br /> */}
                            <input className='input-login' type="username" onChange={handleChangeUpdate} name='username' value={setValues.username} placeholder='Enter Username' />
                            <small>

                            </small>
                        </div>

                        <div className='mb-5'>
                            {/* <label htmlFor='password'>Password</label> <br /> */}
                            <input className='input-login' type="password" onChange={handleChangeUpdate} name='password' value={setValues.password} placeholder='Enter Password' />

                            <small>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Remember me</label>
                                </div>
                            </small>
                        </div>

                        <Loader trigger={ButtonPopup} setTrigger={setButtonPopup}>
                            {displayLoader}
                        </Loader>
                        <Register trigger={RegisterPopUp} setTrigger={setRegisterPopUp} >
                            {RegisterForm}
                        </Register>
                        <div className='login-grid'>

                            <button className='btn-login' onClick={onSuccess}>Log In</button>

                            <small className='txt-signup'>
                                Don't have an account ? <button onClick={() => setRegisterPopUp(true)} className='ms-2'>Sign Up</button>
                            </small>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Login