import { Link } from 'react-router-dom';
import Button from '../../components/Shared/Button';
import './Header.css';

function Header({ onAddPostBtnClickHandler }) {

    return (
        <header className="header">
            <Link to="/user/profile/123" className="header-user">
                <div className="header-user-image">
                    <img src="https://www.dailymoss.com/wp-content/uploads/2019/08/funny-profile-pic59.jpg" alt="" />
                </div>
                <p className="header-user-name">Hi, Guest!</p>
            </Link>

            <Link to="/" className="header-logo">AmicA</Link>

            <ul className="header-ul">
                <li className="header-ul-add-post">
                   <Button type="button" view="round blue" onClick={onAddPostBtnClickHandler}>New Post</Button>
                </li>
                <li><Link to="/user/login">Login</Link></li>
                <li><Link to="/user/register">Register</Link></li>
            </ul>
        </header>
    )
}

export default Header;