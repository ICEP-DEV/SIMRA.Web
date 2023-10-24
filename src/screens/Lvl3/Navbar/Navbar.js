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

    function Profile() {
        navigate("/profile")
    }

    function About() {
        navigate("/Level#section-2")
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

  

    function logout() {
        dispatch(remove_details());
        navigate("/")
    }

    return(
<div className="topnav">

<div className="navbar-subs"><span className="nav-label">Home</span></div> 

<div className="navbar-subs" onClick={Profile}><span className='nav-label'>Profile</span></div>
  <div className="navbar-subs" onClick={data}><span className="nav-label">Sampling Data</span></div>
  <div className="navbar-subs "><div className="wrapper"></div>
  <Link to={"/level2"}> <img className="rounded-img" src={logo}/></Link></div>
  <div className="navbar-subs" onClick={About}><span className="nav-label">About</span></div>
 <div className="navbar-subs"><span className="nav-label">contact</span></div>
  <div className="navbar-subs split" onClick={logout}><span className="nav-label">Signout</span></div>
 

</div>
    )

}
export default Navbar;