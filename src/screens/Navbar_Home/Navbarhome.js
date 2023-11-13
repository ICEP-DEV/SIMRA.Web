import React, { useEffect, useState } from "react";
import './Navbarhome.css';
import { Link } from "react-router-dom";
import logo_2  from '../../assets/logo1_clean.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { remove_details } from "../../Redux/user";
import { remove_sample_details } from "../../Redux/sampling_data"
import { GiHamburgerMenu } from 'react-icons/gi';
import tutlogo from '../../assets/TUT_white.png';
import Login from "../Login/Login";

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [UserType, setUserType] = useState(0);
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
        navigate("/")
    }

    return (
        <div className="topnav">
             <div className="logo">
             <Link to={"/home"}> <img className="rounded-img" src={logo_2} /></Link>
             </div>
             <div className="navbar-subs "><Link to={"/home"}> <img className="rounded-img" src={logo_2} /></Link></div>
            <div className={`nav-links ${showNav ? 'show' : ''}`}>
            <div className="nav_content float-right">
                <div className="navbar-subs mt-2" onClick={() => navigate('/events')}><span className="nav-label">Events</span></div>
                    <div className="navbar-subs split"  onClick={() => navigate('/login')}><span type="button" className="btn btn-success nav-label">Sign In</span></div>
                    
            </div>
            </div>
            <div className="hamburger" onClick={toggleNav}>
                <GiHamburgerMenu />
            </div>

        </div>
    )

}
export default Navbar;