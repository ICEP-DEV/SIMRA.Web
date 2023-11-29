import React, { useEffect, useState } from "react";
import './Navbarhome.css';
import { Link } from "react-router-dom";
import logo from './logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo1 from '../../assets/Simra_logo.png';
import { remove_details } from "../../Redux/user";
import { remove_sample_details } from "../../Redux/sampling_data"
import { api } from '../../Data/API'

function Navbarhome() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [UserType, setUserType] = useState(0)
    let [IsFoundSamplingData, setIsFoundSamplingData] = useState(true);
    let user_info = useSelector((state) => state.user.value)
    let sampling_info = useSelector((state) => state.sampling.value);

    useEffect(() => {
        if (user_info !== undefined) {
            setUserType(user_info.user_level)
            if (sampling_info !== undefined) {
                setIsFoundSamplingData(false)
            }
        }
        else {
            navigate("/")
        }
    }, []);

    function Profile() {
        navigate("/profile")
    }

    function data() {
        navigate("/sampling_data")
    }

    function logout() {
        dispatch(remove_details());
        dispatch(remove_sample_details())
        axios.get(api+'logout',).then(response => {
            if (response.data) {
                console.log(response.data)
                localStorage.removeItem('jsonwebtoken')
            }
        }).catch(error => {
            console.log(error)
        })
        navigate("/")
    }

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };


    return (
        <div className="topnav">
            <div className="logo">
                <Link to={"/home"}> <img className="rounded-img" src={logo1} /></Link>
            </div>
            <div className={`nav-links ${showNav ? 'show' : ''}`}>
                <li className="navbar-subs" onClick={() => navigate('/login')}><span type="button" className="btn btn-success nav-label">Sign In</span></li>
            </div>
            <div className="hamburger" onClick={toggleNav}>
                <GiHamburgerMenu />
            </div>

        </div>
    )

}
export default Navbarhome;