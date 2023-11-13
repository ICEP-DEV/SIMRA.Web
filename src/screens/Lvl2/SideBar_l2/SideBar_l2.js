import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import {BiData} from 'react-icons/bi';
import {PiAsteriskDuotone} from 'react-icons/pi';
import {CiCalculator2} from 'react-icons/ci';
import {BsCheckSquare} from 'react-icons/bs'
import { GrTestDesktop } from "react-icons/gr";
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
        navigate("/profile")
    }

    function fib() {
        navigate("/fib")
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
        <div className="lvl2side_bar ">
            <Link to='/Level2'>
                <h2><img src={logo} /> Simra </h2>
            </Link>


            <div className="sidebar-subs">
                <div className='side-bar-label' onClick={Profile}>
                <span className='side-icon'><AiOutlineUser size={'2rem'} /></span>
                    <span className='side-label'>Profile</span></div>
            </div>
            <div className="sidebar-subs">
                <div className='side-bar-label' onClick={fib}>
                   <span className="side-icon"><BiData size={'2rem'}/></span>
                    <span className='side-label'>FIB</span></div>
            </div>
            
            <div className="sidebar-subs">
                <div className='side-bar-label'  >
                <span className="side-icon"> <BsCheckSquare size={'2rem'}/></span>
                    <span className='side-label'>Risk Characterization</span></div>
            </div>

            <div className="sidebar-subs ">
                <div className='side-bar-label '>
                <span className="side-icon"> <CiCalculator2 size={'2rem'}/></span>
                    <span className='side-label'> QMRA</span></div>
                </div>
      

            <div className="sidebar-subs">
            <div className='side-bar-label' onClick={logout} >
                <span className="side-icon"> <AiOutlineLogout size={'2rem'}/></span>
                    <span className='side-label'>Logout</span>
                </div>
            </div>

        </div>)
}

export default Admin_Side_Bar