import {  AiOutlineLogout, AiFillHome, AiFillVideoCamera } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import "./Sidebar.css";
import logo from './logo.png';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { remove_details } from "../../../../Redux/user"

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let user_info = useSelector((state) => state.user.value)


    useEffect(() => {
        if (user_info === undefined) {
            navigate("/")
        }
    }, [])

    function home() {
        navigate("/home")
    }
    function profile() {
        navigate("/profile")
    }
    function files() {
        navigate("/logs")
    }

    function videos() {
        navigate("/video")
    }

    function logout() {
        dispatch(remove_details());
        navigate("/")
    }
    return (
        <div className="sideBar">
            <Link to='/home'>
                <h2><img src={logo} alt="logo" /> Simra </h2>
            </Link>

            <div className="sidebar-subs">
                <div className='side-bar-label' onClick={home} >
                    <span className='side-icon'><AiFillHome size={'2rem'} /></span>
                    <span className='side-label'> Home</span></div>
            </div>
            <div className="sidebar-subs">
                <div className='side-bar-label' onClick={profile} >
                    <span className='side-icon'><FaUserAlt size={'2rem'} /></span>
                    <span className='side-label'> Profile</span></div>
            </div>
            <div className="sidebar-subs report-dropdown">
                <div className='side-bar-label dropbtn' onClick={files}>
                    <span className='side-icon'><BiSolidReport size={'3rem'} /></span>
                    <span className='side-label'>Report</span>
                </div>
                <div className='dropdown-content'>
                    <Link className='dropdown-link' to='/sanitary_survay_logs_report'>Sanitary Survey</Link><br></br>
                    <Link className='dropdown-link' to='/h2s_logs_report'>H₂S</Link>
                </div>

            </div>

            <div className="sidebar-subs">
                <div className='side-bar-label' onClick={videos} >
                    <span className='side-icon'><AiFillVideoCamera size={'2rem'} /> </span>
                    <span className='side-label'>Video</span></div>
            </div >

            <div className="sidebar-subs">
                <div onClick={logout} ><AiOutlineLogout size={'2rem'} /><br /> Logout</div>
            </div>
        </div >
    )
}

export default Sidebar;