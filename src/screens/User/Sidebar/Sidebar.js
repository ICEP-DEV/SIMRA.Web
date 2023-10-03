import { AiOutlineFile, AiOutlineVideoCameraAdd, AiOutlineLogout,AiFillHome } from "react-icons/ai";
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

    function home(){
        navigate("/home")
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
                <h2><img src={logo} alt="logo"/> Simra </h2>
            </Link>

            <div className="sidebar-subs">
                <div  className='side-bar-label' onClick={home} >
                    <span className='side-icon'><AiFillHome size={'3rem'} /></span>
                    <span className='side-label'> Profile</span></div>
            </div>

            <div className="sidebar-subs">
                <div  className='side-bar-label' onClick={files}>
                    <span className='side-icon'><AiOutlineFile size={'3rem'} /></span>
                    <span className='side-label'>File</span>
                </div>
            </div>

            <div  className="sidebar-subs">
                <div  className='side-bar-label' onClick={videos} >
                    <span className='side-icon'><AiOutlineVideoCameraAdd size={'3rem'} /> </span>
                    <span className='side-label'>Video</span></div>
            </div >

            <div className="sidebar-subs">
                <div onClick={logout} ><AiOutlineLogout size={'3rem'} /><br /> Logout</div>
            </div>
        </div >
    )
}

export default Sidebar;