import { useSelector } from 'react-redux';
import './Header.css';

function Header() {
    let user_info = useSelector((state) => state.user.value)
    return (
        <div className="userHeader">
            <label>{user_info.user_initial} {user_info.user_lastname}</label>
        </div>
    )
}
export default Header;