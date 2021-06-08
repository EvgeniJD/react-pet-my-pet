import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Posts from './components/Posts';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Profile from './components/User/Profile';
import userService from './services/user';

import IsAuth from './hoc/IsAuth';
import AuthContext from './contexts/AuthContext';

import './App.css';

function App() {

  const [ userData, setUserData ] = useState(null);
  const [ isUserDataFetched, setIsUserDataFetched] = useState(false);
  
  useEffect(() => {
    userService.checkAuth()
    .then(res => {
      if(!res) return setIsUserDataFetched(true);
      setUserData(res);
      setIsUserDataFetched(true);
    })
  }, [])
  
  const [isInAddPostMode, setIsInAddPostMode] = useState(false);

  const history = useHistory();
  const location = useLocation();

  function addPostChangeMode() {
    setIsInAddPostMode((oldValue) => !oldValue);
    if (location.pathname !== '/') history.push('/');
  }

  function onCancelAddPost() {
    setIsInAddPostMode(false);
  }

  function onLogoutBtnClickHandler() {
    userService.logout().then(() => {
      setUserData(null);
    })
  }

  if(!isUserDataFetched) return null;
  
  return (
    <div className="App">
      <AuthContext.Provider value={[userData, setUserData]}>
        <Header 
        onAddPostBtnClickHandler={addPostChangeMode}
        onLogoutBtnClickHandler={onLogoutBtnClickHandler}
        />

        <Switch>
          <Route path="/" render={() => <Posts isInAddPostMode={isInAddPostMode} onCancelAddPost={onCancelAddPost} />} exact />
          <Route path="/about" component={About} />
          <Route path="/user/login" component={IsAuth(Login)} />
          <Route path="/user/register" component={IsAuth(Register)} />
          <Route path="/user/profile/:id" component={IsAuth(Profile)} />
        </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
