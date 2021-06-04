import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function IsAuth(InnerComponent) {

    function OuterComponent(props) {

        const [userData] = useContext(AuthContext);

        const { location } = props;
        const currentPath = location.pathname;

        const isAuthNeeded = !(currentPath === '/user/login' || currentPath === '/user/register');
        const isUserAuthenticated = Boolean(userData);

        console.log(isAuthNeeded);
        console.log(isUserAuthenticated);

        if ((isAuthNeeded && isUserAuthenticated) || (!isAuthNeeded && !isUserAuthenticated)) {
            return <InnerComponent {...props} />
        } else if (!isAuthNeeded && isUserAuthenticated) {
            return <Redirect to="/" />
        } else if (isAuthNeeded && !isUserAuthenticated) {
            return <Redirect to="/user/login" />
        }

    }

    return OuterComponent;

}

export default IsAuth;