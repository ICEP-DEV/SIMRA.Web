import './Admin_Side_Bar.css'
import { FaUserAlt } from "react-icons/fa";
import { RiTestTubeLine } from "react-icons/ri";
import { FcSurvey } from "react-icons/fc";
import { AiOutlineFile, AiOutlineVideoCameraAdd, AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import { Outlet, Link } from "react-router-dom";
function Admin_Side_Bar() {
    const navigate = useNavigate();
    return(<div className="admin_side_bar">
        <img src={logo} width="100" height="90"/> Simra<br></br>
            <div className="sidebar-subs">
                <Link to="/"><FaUserAlt /> Profile</Link>
            </div>

            <div className="sidebar-subs">
                <Link to="/report"><RiTestTubeLine />Report</Link>
            </div>

            <div className="sidebar-subs">
                <Link to="/"><AiOutlineLogout /> Logout</Link>
            </div>

    </div>)
}

export default Admin_Side_Bar