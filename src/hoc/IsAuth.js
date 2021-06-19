import { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function IsAuth(InnerComponent) {

    function OuterComponent(props) {

        const [userData] = useContext(AuthContext);

        const location = useLocation();
        const currentPath = location.pathname;

        const isAuthNeeded = !(currentPath === '/user/login' || currentPath === '/user/register');
        const isUserAuthenticated = !!userData;
        
        if (isAuthNeeded && !isUserAuthenticated) {
            return <Redirect to="/user/login" />;
        } else if (currentPath === '/user/login' && isUserAuthenticated) {
            return <Redirect to="/" />;
        } else if (currentPath === '/user/register' && isUserAuthenticated) {
            return <Redirect to={`/user/profile/${userData._id}`} />;
        } 
        
        return <InnerComponent {...props} />;

    }

    return OuterComponent;

}

export default IsAuth;