import './Admin_Side_Bar.css'
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import {Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { remove_details } from "../../../Redux/user"

function Admin_Side_Bar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let user_info = useSelector((state) => state.user.value)

    useEffect(() => {
        if (user_info === undefined) {
            navigate("/")
        }
    }, [])

    function Profile() {
        navigate("/")
    }

    function fbi() {
        navigate("/")
    }
    function count() {
        navigate("/")
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

    return (
        <div className="admin_side_bar">
            <Link to='/municipality'>
                <h2><img src={logo} /> Simra </h2>
            </Link>


            <div className="sidebar-subs">
                <div className='side-bar-label' >
                   
                    <span className='side-label'>Profile</span></div>
            </div>
            <div className="sidebar-subs">
                <div className='side-bar-label' >
                   
                    <span className='side-label'>FBI</span></div>
            </div>
            <div className="sidebar-subs">
                <div className='side-bar-label' >
                   
                    <span className='side-label'>Calculate ratio and estimate count</span></div>
            </div>
            <div className="sidebar-subs">
                <div className='side-bar-label' >
                   
                    <span className='side-label'>Risk Characterization</span></div>
            </div>

            <div className="sidebar-subs ">
                <div className='side-bar-label '>
                 
                    <span className='side-label'>Run QMRA</span></div>
                </div>
      

            <div className="sidebar-subs">
                <div className='side-bar-label' >
                   
                    <span className='side-label'>Logout</span>
                </div>
            </div>

        </div>)
}

export default Admin_Side_Bar