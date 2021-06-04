import { useContext } from 'react';
import UserContext from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../../components/Shared/Button';
import './Header.css';

function Header({ onAddPostBtnClickHandler }) {

    const [ userData ] = useContext(UserContext);

    return (
        <header className="header">
            <Link to="/user/profile/123" className="header-user">
                <div className="header-user-image">
                    <img src="https://www.dailymoss.com/wp-content/uploads/2019/08/funny-profile-pic59.jpg" alt="" />
                </div>
                <p className="header-user-name">{userData ? `Hi, ${userData.username} !` : "Hi, pal !"}</p>
            </Link>

            <Link to="/" className="header-logo">AmicA</Link>

            <ul className="header-ul">
                {userData && <li className="header-ul-add-post">
                   <Button type="button" view="round blue" onClick={onAddPostBtnClickHandler}>New Post</Button>
                </li>}
                {!userData && <li><Link to="/user/login">Login</Link></li>}
                <li><Link to="/user/login">Login</Link></li>
                {!userData && <li><Link to="/user/register">Register</Link></li>}
            </ul>
        </header>
    )
}

export default Header;