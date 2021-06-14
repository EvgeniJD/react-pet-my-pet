import { useContext } from 'react';
import UserContext from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../../components/Shared/Button';
import './Header.css';

function Header({ onAddPostBtnClickHandler, onLogoutBtnClickHandler }) {

    const [userData] = useContext(UserContext);

    return (
        <header className="header">
            <div className="header-user-wrapper">
                {!userData && <h3>Hi, pal !</h3>}
                {userData && <Link to={`/user/profile/${ userData._id }`} className="header-user">
                    <div className="header-user-image">
                        <img src={ userData.avatar } alt="" />
                    </div>
                    <p className="header-user-username">Hi, <b>{userData.username.split(' ')[0]}</b> !</p>
                </Link>}
                {userData && <Button view="round gray" newClassName="logout-btn" onClick={onLogoutBtnClickHandler}>Logout</Button>}
            </div>

            {userData && <Link to="/" className="header-logo">AmicA</Link>}
            {!userData && <div className="header-logo">AmicA</div>}

            <ul className="header-ul">
                {userData && <li className="header-ul-add-post">
                    <Button type="button" view="round blue" onClick={onAddPostBtnClickHandler}>New Post</Button>
                </li>}
                {!userData && <li><Link to="/user/login">Login</Link></li>}
                {!userData && <li><Link to="/user/register">Register</Link></li>}
                <li><Link to="/about">About</Link></li>
            </ul>
        </header>
    )
}

export default Header;