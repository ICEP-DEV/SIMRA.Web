import { FaUserAlt } from "react-icons/fa";
import { RiTestTubeLine } from "react-icons/ri";
import { FcSurvey } from "react-icons/fc";
import { AiOutlineFile, AiOutlineVideoCameraAdd, AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import "./Sidebar.css";
import logo from './logo.png';

console.log(logo);
function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="sideBar">

            <img src={logo} /><h2>Simra</h2><br></br>
            <div className="sidebar-subs">
                <a href=""><FaUserAlt /> Profile</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><RiTestTubeLine />H2S</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><FcSurvey />Survey</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><AiOutlineFile />File</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><AiOutlineVideoCameraAdd /> Video</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><AiOutlineLogout /> Logout</a>
            </div>

        </div>
    )
}

export default Sidebar;