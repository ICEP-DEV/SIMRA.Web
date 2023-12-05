import Simra_logo from '../../../assets/Simra_logo.png';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { remove_details } from "../../../Redux/user";
//icons
import { FaMapMarkedAlt } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";

function SideBar (){
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

    return(
        <div className=''>
            <div className="sidebar">
                <Link to={"/admin"}> <img className="rounded-img" src={Simra_logo} /></Link></div>
            <div className="side-subs" onClick={() => navigate('/users')}>
<span> <FaUser  className="icon" /> Customers</span>
            </div>
            <div className="side-subs" onClick={() => navigate('/manage_events')}>
<span> <MdEventAvailable  className="icon" /> Events</span>
            </div>

            <div className="side-subs dropdown " >
                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    <TbReportAnalytics  className="icon" />  Reports
                    </a>

                    <ul className="dropdown-menu">
                        <li className='dropdown-item' onClick={() => navigate('/h2sreport')}>H2S</li>
                        <li className='dropdown-item' onClick={() => navigate('/survay_logs')}>Sanitary</li>
                        

                            <li className='dropdown-item' onClick={() => navigate('/qmra_logs')}>FIB</li>
                     

                    
                            <li className='dropdown-item' onClick={() => navigate('/mst_logs')}>MST</li>
                   

                    </ul>

                </div>

    
<div className="side-subs">
<span><FaMapMarkedAlt  className="icon" /> Map</span>
</div>
<div className="side-subs">
<button className='btn btn-success' onClick={logout}>Logout</button>
</div>
        </div>
    )
}
export default SideBar;