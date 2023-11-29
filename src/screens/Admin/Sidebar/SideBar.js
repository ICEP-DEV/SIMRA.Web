import Simra_logo from '../../../assets/Simra_logo.png'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { remove_details } from "../../../Redux/user"
function SideBar (){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let user_info = useSelector((state) => state.user.value)
    
    useEffect(() => {
        if (user_info === undefined) {
            navigate("/")
        }
    }, [])

    function report() {
        navigate("/report")
    }

    function logout() {
        dispatch(remove_details());
        navigate("/")
    }

    return(
        <div className=''>
            <div className="sidebar">
                <Link to={"/admin"}> <img className="rounded-img" src={Simra_logo} /></Link></div>
            <div className="side-subs">
<span> Customers</span>
            </div>
            <div className="side-subs">
<span>Reports</span>
</div>
<div className="side-subs">
<span>Map</span>
</div>
<div className="side-subs">
<button onClick={logout}>Logout</button>
</div>
        </div>
    )
}
export default SideBar;