import './Admin_Side_Bar.css'
import { FaUserAlt } from "react-icons/fa";
import { RiTestTubeLine } from "react-icons/ri";
import { FcSurvey } from "react-icons/fc";
import { AiOutlineFile, AiOutlineVideoCameraAdd, AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { remove_details } from "../../Redux/user"

function Admin_Side_Bar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let user_info = useSelector((state) => state.user.value)

    useEffect(() => {
        if (user_info === undefined) {
            navigate("/")
        }
    }, [])

    function logout() {
        dispatch(remove_details());
        navigate("/")
    }

    function logout() {
        dispatch(remove_details());
        navigate("/")
    }

    return (<div className="admin_side_bar">
        <h2><img src={logo} /> Simra </h2>

        <div className="sidebar-subs">
            <Link to="/" className='side-bar-label'>
                <span className='side-icon'><FaUserAlt /></span>
                <span className='side-label'>Profile</span></Link>
        </div>

        <div className="sidebar-subs">
            <Link to="/report" className='side-bar-label'>
                <span className='side-icon'><RiTestTubeLine /></span>
                <span className='side-label'>Report</span>
            </Link>
        </div>

        <div className="sidebar-subs">
            <div className='side-bar-label' onClick={logout} >
                <span className='side-icon'><AiOutlineLogout size={'3rem'} /></span>
                <span className='side-label'>Logout</span>
            </div>
        </div>

    </div>)
}

export default Admin_Side_Bar