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
            <div className="icon-subs">  <Link to="/profile"  ><FaUserAlt size={'3rem'} /> <span>Profile</span></Link></div>
            </div>


            <div className="sidebar-subs">
            <div className="icon-subs">  <Link to="/" ><AiOutlineFile size={'3rem'} /><span>File</span></Link></div>
            </div>

            <div className="sidebar-subs">
               
                <div className="icon-subs"> <Link to="/video" ><AiOutlineVideoCameraAdd size={'3rem'} /> <span>Video</span></Link></div>
            </div>

            <div className="sidebar-subs">
                <div onClick={logout} className="icon-subs" ><AiOutlineLogout size={'3rem'} /> <span>Logout</span></div>
            </div>

        </div>
    )
}

export default Sidebar;