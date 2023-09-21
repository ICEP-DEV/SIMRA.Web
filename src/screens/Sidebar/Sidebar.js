import {FaUserAlt} from "react-icons/fa";
import{RiTestTubeLine} from "react-icons/ri";
import{FcSurvey} from "react-icons/fc";
import{AiOutlineFile,AiOutlineVideoCameraAdd,AiOutlineLogout} from "react-icons/ai";
import { useNavigate} from 'react-router-dom';
import "./Sidebar.css";

function Sidebar (){
    const navigate = useNavigate();
   
    return(
        <div className="sideBar">
<FaUserAlt/> Profile
<RiTestTubeLine/>H2S
<FcSurvey/>Survey
<AiOutlineFile/>File
<AiOutlineVideoCameraAdd/> Video
<AiOutlineLogout/> Logout
        </div>
    )
}