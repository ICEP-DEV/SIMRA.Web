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
<div className="logo">
<img src={logo} style={{marginLeft:'25px'}} />Simra<br></br>
</div>
           
            <div className="sidebar-subs">
                <a href=""><FaUserAlt   size={'3rem'}/> Profile</a>
            </div> 

            <div className="sidebar-subs">
                <a href=""><RiTestTubeLine   size={'3rem'}/>H2S</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><FcSurvey  size={'3rem'}/>Survey</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><AiOutlineFile  size={'3rem'} />File</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><AiOutlineVideoCameraAdd  size={'3rem'} /> Video</a>
            </div>

            <div className="sidebar-subs">
                <a href=""><AiOutlineLogout size={'3rem'}/> Logout</a>
            </div>

        </div>
    )
}

export default Sidebar;