import React,{useEffect} from "react";
import './Navbar.css';
import {Link } from "react-router-dom";
import logo from './logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { remove_details } from "../../../Redux/user";

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

    function Report() {
        navigate("/logs")
    }
    function data() {
        navigate("/sampling_data2")
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
  <div className="navbar-subs" onClick={Report}><span className="nav-label">Report</span></div>
 <div className="navbar-subs report-dropdown">
    
     <span className="nav-label">Levels</span>
    <div className='dropdown-content'>
                    <Link className='dropdown-link' to='/home'>Level1</Link><br></br>
                 
                </div>

    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <Link className="dropdown-item" to={"/home"}>Level1</Link>
        <Link to={"/level2"}>Level2</Link>
        
    </ul>
    </div>
  <div className="navbar-subs split" onClick={logout}><span className="nav-label">Signout</span></div>
 

</div>
    )

}
export default Navbar;