import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <article className="header-user">
                <div className="header-user-image">
                    <img src="https://www.dailymoss.com/wp-content/uploads/2019/08/funny-profile-pic59.jpg" alt="" />
                </div>
                <p className="header-user-name">Hi, Guest!</p>
            </article>
            <ul className="header-ul">
                <li className="header-ul-add-post">
                    <Link to="/new-comment">+</Link>
                </li>
                <li><Link to="/user/login">Login</Link></li>
                <li><Link to="/user/register">Register</Link></li>
            </ul>
        </header>
    )
}

export default Header;