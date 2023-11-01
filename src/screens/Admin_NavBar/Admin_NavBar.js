
import { RiTestTubeLine } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { AiOutlineLogout, AiFillHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import logo from './logo2.png';
import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { remove_details } from "../../Redux/user"
import logo_2 from '../../assets/Simra_logo.png'

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
                <Link to={"/municipality"}> <img className="rounded-img" src={logo_2} /></Link></div>

            <div className="navbar-subs d-flex justify-content-end" onClick={home}><span className="nav-label">Home</span></div>
            <div className="navbar-subs split "  onClick={logout}><span type="button" className="btn btn-success nav-label ">Signout</span></div>


        </div>
    )
}

export default Admin_Side_Bar