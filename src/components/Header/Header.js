import { useContext, useState } from 'react';
import UserContext from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../../components/Shared/Button';
import './Header.css';

function Header({ onAddPostBtnClickHandler, onLogoutBtnClickHandler }) {

    const [userData] = useContext(UserContext);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenuVisability = () => setIsMenuVisible(state => !state);

    return (
        <header className="header">
            <div className="header-user-wrapper">
                {!userData && <h3>Hi, pal !</h3>}
                {userData && <Link to={`/user/profile/${userData._id}`} className="header-user">
                    <div className="header-user-image">
                        <img src={userData.avatar} alt="" />
                    </div>
                    <p className="header-user-username">Hi, <b>{userData.username.split(' ')[0]}</b> !</p>
                </Link>}
                {userData &&
                    <Button view="round gray" newClassName="logout-btn" onClick={onLogoutBtnClickHandler}
                    >
                        Logout
                    </Button>
                }
            </div>

            {userData && <Link to="/" className="header-logo">AmicA</Link>}
            {!userData && <div className="header-logo">AmicA</div>}

            {/* <ul className="header-ul">
                {userData && <li className="header-ul-add-post">
                    <Button type="button" view="round blue" onClick={onAddPostBtnClickHandler}>Add New Post</Button>
                </li>}
                {!userData && <li><Link to="/user/login">Login</Link></li>}
                {!userData && <li><Link to="/user/register">Register</Link></li>}
                <li><Link to="/about">About</Link></li>
            </ul> */}
            {userData &&
                <>
                    <i class="fas fa-sign-out-alt btn gray"></i>
                    <i class="fas fa-plus btn blue" onClick={onAddPostBtnClickHandler}></i>
                    <Button
                        type="button"
                        view="round blue"
                        newClassName="add-post-btn-big"
                        onClick={onAddPostBtnClickHandler}
                    >
                        +Add New Post
                    </Button>
                </>}



            {!userData &&
                <article className="header-menu" >
                    <i className="fas fa-bars" onClick={toggleMenuVisability}></i>
                    {isMenuVisible &&
                        <ul className="no-auth-menu" onMouseLeave={toggleMenuVisability}>
                            <li><Link to="/user/login">Login</Link></li>
                            <li><Link to="/user/register">Register</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    }
                </article>
            }
        </header>
    )
}

export default Header;