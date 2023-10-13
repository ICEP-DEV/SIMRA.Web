import { useSelector } from 'react-redux';
import './Header.css';
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';


function Header() {
    let user_info = useSelector((state) => state.user.value)
    return (
        
            <div className="userHeader" ><Link to="/profile">
                <FaUserAlt className='user_profile' /><label>{user_info.user_initial} {user_info.user_lastname}</label>
            </Link></div>
        

    )
}
export default Header;