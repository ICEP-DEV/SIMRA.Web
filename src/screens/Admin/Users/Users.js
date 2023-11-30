import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './User.css';
import SideBar from '../Sidebar/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import NavBar_Admin from '../NavBar_Admin/NavBar_Admin';
import Register from '../../Registration/Registration';
import { ToastContainer, toast } from 'react-toastify';

function Users(){
    const api = "http://localhost:3001/api/"
    let user_info = useSelector((state) => state.use)
    const dispatch = useDispatch();


    let [RegisterPopUp, setRegisterPopUp] = useState(false);
    let navigate = useNavigate();
    const [ButtonPopup, setButtonPopup] = useState(false);
    const [users, setUsers] = useState([{}]);
    const [datafound, setDataFound] = useState({});
 
   
   
   // Register state variables
   const [Email, setEmail] = useState('')
   const [Firstname, setFirstname] = useState('')
   const [Lastname, setLastname] = useState('')
   const [PhoneNumber, setPhoneNumber] = useState('')
   const [Password, setPassword] = useState('')
   const [RePassword, setRePassword] = useState('')
   const [Level, setLevel] = useState('')
   const [showNav, setShowNav] = useState(false);
   const toggleNav = () => {
    setShowNav(!showNav);
  };

  
     
    useEffect(() => {

        axios.get(api + 'get_users/').then((response) => {
            setDataFound(response.data.success)
            if (response.data.success === true) {
                setUsers(response.data.results)
                console.log(users)

            }

        })


    }, []);

    
    // register function
    function handleRegistration() {

        // Empty values
        if (Email === "") {
            toast.warn("Enter email address!", {
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
        if (Firstname === "") {
            toast.warn("Enter firstname!", {
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
        if (Lastname === "") {
            toast.warn("Enter lastname!", {
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
        if (PhoneNumber === "") {
            toast.warn("Enter phone number!", {
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
        if (Password === "") {
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
        if (RePassword === "") {
            toast.warn("Enter password confirmation!", {
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
        if (Level === "") {
            toast.warn("Select level!", {
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
  
        // Match Password
        if (Password !== RePassword) {
            toast.warn("Passwords does not match!", {
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
  
        // validate strong password
        var regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!Password.match(regPass)) {
            toast.warn("Enter strong password!", {
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
  
        // validate email address
        var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!Email.match(validEmail)) {
            toast.warn("Enter valid email address!", {
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
  
        // validate phone number
        if (PhoneNumber.length !== 10) {
            toast.warn("Enter correct phone number!", {
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
  
        var register_form = {
            email: Email,
            firstname: Firstname,
            lastname: Lastname,
            mobileNo: PhoneNumber,
            password: Password,
            level: Level
        }
  
        axios.post(api+"registration", register_form).then((respond) => {
            if (respond.data.success === true) {
                toast.success(respond.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    setRegisterPopUp(false)
                }, 2000)
  
            }
            else {
                toast.error(respond.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }, (error) => {
            console.log(error)
        })
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
        <h3 className='header-txt' style={{ textAlign: 'center' }}><b>Add New User</b></h3>
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
            <select className='select-sampling_data control-form p-2' onChange={(event) => setLevel(event.target.value)} >
                <option value='' className="control-form" disabled selected>Select Level</option>
                <option value='0' className='control form'>Municipality</option>

                <option value='1' className="control-form">Level One (Household)</option>
                <option value='2' className="control-form">Level Two (Intermediate)</option>
                <option value='3' className="control-form">Level Three (Expert)</option>
            </select>

        </div>
    </div>
    <div className='form-group'>
        <button className='btn btn-primary ' onClick={handleRegistration}>Add user</button>
    </div>

</div>
    return(
        <div className="container-admin" >
        <div className='sidebar-admin ' >
        <SideBar/>
        </div>
           <div className='main-admin'>
            <h2 className='text-primary text-center'>Customers</h2>
            <div  className='users-admin'>
            <table>
                <thead className='alert alert-info'>
                    <tr>
                        
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Firstname</th>
                        <th>LastName</th>
                        <th>Level</th>
                        <th>role</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, xid) => (
                        <tr key={xid} className="survey_tr" scope="row">
                           
                            <td>{user.email}</td>
                            <td>{user.mobileNo}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.level}</td>
                            <td>{user.role}</td>

                            <td><button className='btn btn-dark'>Update</button></td>
                            <td><button className='btn btn-secondary'>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Register trigger={RegisterPopUp} setTrigger={setRegisterPopUp} >
                        {RegisterForm}
                    </Register>
            <div className='btn-admin'>
            <button className='btn-admin btn btn-primary mt-5 '  onClick={() => setRegisterPopUp(true)} >ADD USER</button>
            </div>
            </div>
           
            
           </div>
           
          
        
        </div>
    )
}
export default Users;