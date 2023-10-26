import { useSelector } from 'react-redux';
import './Header.css';
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function Header() {
    const navigate = useNavigate();
    let user_info = useSelector((state) => state.user.value);
    useEffect(() => {
        console.log(user_info)
        if (user_info === undefined) {
            navigate("/");
            return;
        }
    }, [])

    return (
        
            <div className="userHeader" ><Link className=""to="/profile">
                <FaUserAlt color="#fff" className='user_profile' /><label style={{color:'white'}}>{user_info.user_initial} {user_info.user_lastname}</label>
            </Link></div>
        

    )
}
export default Header;