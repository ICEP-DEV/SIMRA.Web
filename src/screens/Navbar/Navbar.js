<<<<<<< HEAD
import React,{useEffect} from "react";
import './Navbar.css';
import {Link } from "react-router-dom";
import logo from './logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { remove_details } from "../../Redux/user";

function Navbar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let user_info = useSelector((state) => state.user.value)
    useEffect(() => {
        if (user_info === undefined) {
            navigate("/")
        }
    }, [])

=======
import React, { useEffect, useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import logo_2  from '../../assets/Simra_logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { remove_details } from "../../Redux/user";
import { remove_sample_details } from "../../Redux/sampling_data"
import { GiHamburgerMenu } from 'react-icons/gi';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [UserType, setUserType] = useState(0)
    let [IsFoundSamplingData, setIsFoundSamplingData] = useState(true);
    let user_info = useSelector((state) => state.user.value)
    let sampling_info = useSelector((state) => state.sampling.value);

    useEffect(() => {
        if (user_info !== undefined) {
            setUserType(user_info.user_level)
            if (sampling_info != undefined) {
                setIsFoundSamplingData(false)
            }
        }
        else {
            navigate("/")
        }
    }, [])
>>>>>>> 21883e8de7c1d576c00da186cdffb160dddb25a6
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

<<<<<<< HEAD
  
=======

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
      setShowNav(!showNav);
    };
>>>>>>> 21883e8de7c1d576c00da186cdffb160dddb25a6

    function logout() {
        dispatch(remove_details());
        navigate("/")
    }

<<<<<<< HEAD
    return(
<div className="topnav">

<div className="navbar-subs"><span className="nav-label">Home</span></div> 

<div className="navbar-subs" onClick={Profile}><span className='nav-label'>Profile</span></div>
  <div className="navbar-subs" onClick={data}><span className="nav-label">Sampling Data</span></div>
  <div className="navbar-subs "><div className="wrapper"></div>
  <Link to={"/home"}> <img className="rounded-img" src={logo}/></Link></div>
  <div className="navbar-subs" ><span className="nav-label">Report</span></div>
 <div className="navbar-subs dropdown"><span className="nav-label">Levels</span></div>
  <div className="navbar-subs split" onClick={logout}><span className="nav-label">Signout</span></div>
 

</div>
=======
    return (
        <div className="topnav">
             <div className="logo">
             <Link to={"/home"}> <img className="rounded-img" src={logo_2} /></Link>
             </div>
             <div className="navbar-subs "><Link to={"/home"}> <img className="rounded-img" src={logo_2} /></Link></div>
            <div className={`nav-links ${showNav ? 'show' : ''}`}>
           
                <div className="navbar-subs mt-2" onClick={() => navigate('/home')}><span className="nav-label">Home</span></div>
                <div className="navbar-subs mt-2" onClick={Profile}><span className='nav-label'>Profile</span></div>
                
                <div className="navbar-subs mt-2" onClick={data}><span className="nav-label">Sampling Data</span></div>
                
                <div className="navbar-subs  mt-2 dropdown float-right" hidden={IsFoundSamplingData}>
                    {sampling_info !== undefined && <div>
                        <span className="nav-label dropbtn">Levels</span>
                        <ul class="dropdown-content">
                            {(UserType === 1 || UserType === 2 || UserType === 3) && (<span>
                                <li className='dropdown-link' onClick={() => navigate('/h2s_survey')}>HouseHold (Level 1)</li>
                            </span>)}
                            {(UserType === 2 || UserType === 3) && (<span>
                                <li className='dropdown-link' onClick={() => navigate('/fib_analysis')}>Intermediate (Level 2)</li>
                            </span>)}
                            {(UserType === 3) && (<span>
                                <li className='dropdown-link' onClick={() => navigate('/mst')}>Expert (Level 3)</li>
                            </span>)}
                        </ul>
                    </div>}
                </div>
                <div className="navbar-subs  mt-2 dropdown"><span className="nav-label dropbtn">Report</span>
                    <ul class="dropdown-content">
                        <li className='dropdown-link' onClick={() => navigate('/h2s_logs')}>H2S</li>
                        <li className='dropdown-link' onClick={() => navigate('/survay_logs')}>Sanitary</li>
                        {(UserType === 2 || UserType === 3) && (<span>
                            <li className='dropdown-link' onClick={() => navigate('/qmra_logs')}>QMRA</li>
                        </span>)}
                        {( UserType === 3) && (<span>
                            <li className='dropdown-link'>Microbial Source Tracker</li>
                        </span>)}                        
                    </ul>
                </div>
            
                    <div className="navbar-subs split"  onClick={logout}><span type="button" className="btn btn-success nav-label float-right">Signout</span></div>
           
            </div>
            <div className="hamburger" onClick={toggleNav}>
                <GiHamburgerMenu />
            </div>

        </div>
>>>>>>> 21883e8de7c1d576c00da186cdffb160dddb25a6
    )

}
export default Navbar;