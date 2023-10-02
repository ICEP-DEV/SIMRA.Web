import { FaUserAlt } from "react-icons/fa";
import { RiTestTubeLine } from "react-icons/ri";
import { AiOutlineFile, AiOutlineVideoCameraAdd, AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import "./Sidebar.css";
import logo from './logo.png';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { remove_details } from "../../../Redux/user"

function Sidebar() {
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
    return (
        <div className="sideBar">
            <div className="logo">
                <img src={logo} alt="logo" style={{ marginLeft: '25px' }} />Simra<br></br>
            </div>

            <div className="sidebar-subs">
                <Link to="/" >
                    <span className='side-icon'><FaUserAlt size={'3rem'} /></span><br/>
                    <span className='side-label'> Profile</span></Link>
            </div>

            {/* <div className="sidebar-subs">
                <Link to="/" ><RiTestTubeLine />H2S</Link>
            </div>

            <div className="sidebar-subs">
                <Link to="/"><RiTestTubeLine />Sanitary</Link>
            </div> */}

            <div className="sidebar-subs">
                <Link to="/" className="inner-sidebar">
                    <div></div>
                    <span className='side-icon'><AiOutlineFile size={'3rem'} /></span><br/>
                    <span className='side-label'>File</span>
                </Link>
            </div>

            <div className="sidebar-subs">
                <Link to="/Video" >
                    <span className='side-icon'><AiOutlineVideoCameraAdd size={'3rem'} /> </span><br/>
                    <span className='side-label'>Video</span></Link>
            </div >

            <div className="sidebar-subs">
                <div onClick={logout} ><AiOutlineLogout size={'3rem'} /><br/> Logout</div>
            </div>
        </div >
    )
}

export default Sidebar;