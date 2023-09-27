import { FaUserAlt } from "react-icons/fa";
import {FiLogOut} from "react-icons/fi";
import { RiTestTubeLine } from "react-icons/ri";
import { FcSurvey } from "react-icons/fc";
import { AiOutlineFile, AiOutlineVideoCameraAdd, AiFillVideoCamera } from "react-icons/ai";
import {GoVideo} from "react-icons/go"
import { useNavigate } from 'react-router-dom';
import "./Sidebar.css";
import logo from './logo.png';
import { IconContext } from "react-icons";

console.log(logo);
function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="sideBar">
<div className="logo">
<img src={logo} style={{marginLeft:'25px'}} />Simra<br></br>
</div>
<IconContext.Provider value={{ className: "side-icon" }}>
            <div className="sidebar-subs">
              
                <a href=""><FaUserAlt  className="icon" /><br></br> Profile</a>
            </div> 

            <div className="sidebar-subs">
                <a href=""><RiTestTubeLine   /><br></br>H2S</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><FcSurvey  /><br></br>Survey</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><AiOutlineFile  /><br></br>File</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><GoVideo  /> <br></br>Video</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><FiLogOut /><br></br> Logout</a>
            </div>
            </IconContext.Provider>
        </div>
    )
}

export default Sidebar;