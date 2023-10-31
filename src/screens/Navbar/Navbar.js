import React, { useEffect, useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import logo from './logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { remove_details } from "../../Redux/user";
import axios from 'axios';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo1 from '../../assets/Simra_logo.png';


function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [UserType, setUserType] = useState(0)
    let user_info = useSelector((state) => state.user.value)
    useEffect(() => {
        if (user_info === undefined) {
            navigate("/")
        }
        else {
            console.log(user_info.user_level)

            setUserType(user_info.user_level)
        }
    }, [])

    function Profile() {
        navigate("/profile")
    }

    function report() {
        navigate("/logs")
    }
    function data() {
        navigate("/sampling_data")
    }

    function risk() {
        navigate("/")
    }
    function qmra() {
        navigate("/")
    }

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
      setShowNav(!showNav);
    };
  



    function logout() {
        dispatch(remove_details());
        axios.get('http://localhost:3001/api/logout',
       
        ).then(response => {
          if(response.data) { 
            console.log(response.data)    
            
          
            localStorage.removeItem('jsonwebtoken')
           
          }
        }).catch(error => {
          console.log(error)    
        })
        navigate("/")
    }

    return (
        <div className="topnav">
             <div className="logo">
             <Link to={"/home"}> <img className="rounded-img" src={logo1} /></Link>
             </div>
            <div className={`nav-links ${showNav ? 'show' : ''}`}>
            
                <div className="navbar-subs" onClick={() => navigate('/home')}><span className="nav-label">Home</span></div>
                <div className="navbar-subs" onClick={Profile}><span className='nav-label'>Profile</span></div>
                
                <div className="navbar-subs" onClick={data}><span className="nav-label">Sampling Data</span></div>
                {/* <div className="navbar-subs ">
                    <Link to={"/home"}> <img className="rounded-img" src={logo} /></Link></div> */}
                <div className="navbar-subs" onClick={report}><span className="nav-label">Report</span></div>
                {/* <div className="navbar-subs dropdown">
                    <span className="nav-label">Levels</span>
                    {UserType === 2 && (<span>
                        <Link className='dropdown-link' to=''>Level 1</Link>
                        <Link className='dropdown-link' to=''>Level 2</Link>
                    </span>)}
                    {UserType === 3 && (<span>
                        <Link className='dropdown-link' to=''>Level 1</Link>
                        <Link className='dropdown-link' to=''>Level 2</Link>
                        <Link className='dropdown-link' to=''>Level 2</Link>
                    </span>)}
                </div> */}
                <div className="navbar-subs" onClick={report}><span className="nav-label">Events</span></div>
                <div className="navbar-subs split" onClick={logout}><span className="nav-label">Signout</span></div>
            </div>
            <div className="hamburger" onClick={toggleNav}>
                <GiHamburgerMenu />
            </div>

        </div>
    )

}
export default Navbar;