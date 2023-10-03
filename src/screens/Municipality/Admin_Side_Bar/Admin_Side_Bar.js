import './Admin_Side_Bar.css'
import { RiTestTubeLine } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { AiOutlineLogout, AiFillHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import { Outlet, Link } from "react-router-dom";
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

    function home() {
        navigate("/municipality")
    }

    function report() {
        navigate("/report")
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
                <div className='side-bar-label' onClick={home}>
                    <span className='side-icon'><AiFillHome /></span>
                    <span className='side-label'>Home</span></div>
            </div>

            <div className="sidebar-subs report-dropdown">
                <div className='side-bar-label dropbtn' onClick={report}>
                    <span className='side-icon'><BiSolidReport /></span>
                    <span className='side-label'>Report</span>
                </div>
                <div className='dropdown-content'>
                    <Link to='/sanitary_report'>Sanitary Survey</Link>
                    <Link to='/h2s_report'>H2S</Link>
                </div>

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