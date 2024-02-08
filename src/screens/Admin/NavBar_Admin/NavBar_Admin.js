

import { useNavigate } from 'react-router-dom';
import Simra_logo from '../../../assets/Simra_logo.png'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { remove_details } from "../../../Redux/user"

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
        navigate("/municipality1")
    }

    function user() {
        navigate("/users")
    }
    function logout() {
        dispatch(remove_details());
        navigate("/")
    }

    return (


        <div className="topnav">
           <div className="logo float-left">
                <Link to={"/home"}> <img className="rounded-img" src={Simra_logo} /></Link>
            </div>



            <div className="navbar-subs" onClick={home}><span className="nav-label">Home</span></div>
    
            {/* <div className="navbar-subs report-dropdown" onClick={report}>
                <span className='nav-label'>Report</span> */}
                {/* <div className='dropdown-content'>

                    <Link className='dropdown-link' to='/sanitary_report'>Sanitary Survey</Link><br></br>
                    <Link className='dropdown-link' to='/h2s_report'>H2S</Link>
                </div> */}

            {/* </div> */}
            <div className="navbar-subs split" onClick={logout}>
            <button className=" btn btn-success fw-bold" >Signout</button>
                </div>

                </div>
       
    )
}

export default Admin_Side_Bar