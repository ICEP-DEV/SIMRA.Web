import React, { useEffect, useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import logo from './logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { remove_details } from "../../Redux/user";
import { remove_sample_details } from "../../Redux/sampling_data"


function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [UserType, setUserType] = useState(0)
    let [IsFoundSamplingData, setIsFoundSamplingData] = useState(true);
    let user_info = useSelector((state) => state.user.value)
    let sampling_info = useSelector((state) => state.sampling.value)

    useEffect(() => {
        if (user_info !== undefined) {
            setUserType(user_info.user_level)
            if (sampling_info != undefined) {
                setIsFoundSamplingData(false)
            }
        }
        else {
            navigate("/")
        }
    }, [])

    function Profile() {
        navigate("/profile")
    }

    function data() {
        navigate("/sampling_data")
    }

    function risk() {
        navigate("/")
    }
    function qmra() {
        navigate("/")
    }

    function logout() {
        dispatch(remove_details());
        dispatch(remove_sample_details())
        navigate("/")
    }

    return (
        <div className="topnav">
            <div className="navbar-subs ">
                <Link to={"/home"}> <img className="rounded-img" src={logo} /></Link>
            </div>
            <div className="nav_content">
                <div className="navbar-subs" onClick={() => navigate('/home')}><span className="nav-label">Home</span></div>
                <div className="navbar-subs" onClick={Profile}><span className='nav-label'>Profile</span></div>
                <div className="navbar-subs" onClick={data}><span className="nav-label">Sampling Data</span></div>

                <div className="navbar-subs dropdown" hidden={IsFoundSamplingData}>
                    {sampling_info !== undefined && <div>
                        <span className="nav-label dropbtn">Levels</span>
                        <ul class="dropdown-content">
                            {(UserType === 1 || UserType === 2 || UserType === 3) && (<span>
                                <li className='dropdown-link' onClick={() => navigate('/h2s_survey')}>Level 1</li>
                            </span>)}
                            {(UserType === 2 || UserType === 3) && (<span>
                                <li className='dropdown-link' onClick={() => navigate('/fib_analysis')}>Level 2</li>
                            </span>)}
                            {(UserType === 3) && (<span>
                                <li className='dropdown-link' onClick={() => navigate('/mst')}>Level 3</li>
                            </span>)}
                        </ul>
                    </div>}
                </div>
                <div className="navbar-subs dropdown"><span className="nav-label dropbtn">Report</span>
                    <ul class="dropdown-content">
                        <li className='dropdown-link' onClick={() => navigate('/h2s_logs')}>H2S</li>
                        <li className='dropdown-link' onClick={() => navigate('/survay_logs')}>Sanitary</li>
                        {(UserType === 2 || UserType === 3) && (<span>
                            <li className='dropdown-link' onClick={() => navigate('/qmra_logs')}>QMRA</li>
                        </span>)}
                        {( UserType === 3) && (<span>
                            <li className='dropdown-link'>MST</li>
                        </span>)}                        
                    </ul>
                </div>

                <div className="navbar-subs split" onClick={logout}><span className="nav-label">Signout</span></div>
            </div>
        </div>
    )

}
export default Navbar;