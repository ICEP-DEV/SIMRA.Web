
import { RiTestTubeLine } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { AiOutlineLogout, AiFillHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Simra_logo from '../../assets/Simra_logo.png'
import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { remove_details } from "../../Redux/user"

function Admin_Side_Bar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let user_info = useSelector((state) => state.user.value)

    useEffect(() => {
        if (user_info === undefined) {
            navigate("/")
        }
    }, [])

    function home() {
        navigate("/municipality")
    }

    function report() {
        navigate("/report")
    }

    function logout() {
        dispatch(remove_details());
        navigate("/")
    }

    return (


        <div className="topnav">
            <div className="navbar-subs "><div className="wrapper"></div>
                <Link to={"/municipality"}> <img className="rounded-img" src={Simra_logo} /></Link></div>

            <div className="navbar-subs" onClick={home}><span className="nav-label">Home</span></div>
            {/* <div className="navbar-subs report-dropdown" onClick={report}>
                <span className='nav-label'>Report</span> */}
                {/* <div className='dropdown-content'>

                    <Link className='dropdown-link' to='/sanitary_report'>Sanitary Survey</Link><br></br>
                    <Link className='dropdown-link' to='/h2s_report'>H2S</Link>
                </div> */}

            {/* </div> */}
            <div className="navbar-subs split" onClick={logout}><span className="nav-label">Signout</span></div>


        </div>
    )
}

export default Admin_Side_Bar