import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Posts from './components/Posts';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Profile from './components/User/Profile';

import IsAuth from './hoc/IsAuth';
import AuthContext from './contexts/AuthContext';

import './App.css';

function App() {

  const [userData, setUserData] = useState(null);
  const [isInAddPostMode, setIsInAddPostMode] = useState(false);

  function addPostChangeMode() {
    setIsInAddPostMode((oldValue) => !oldValue);
  }

  return (
    <div className="App">
      <AuthContext.Provider value={[userData, setUserData]}>
        <Header onAddPostBtnClickHandler={addPostChangeMode} />

        <Switch>
          <Route path="/" render={() => <Posts isInAddPostMode={isInAddPostMode} onCancelAddPost={addPostChangeMode} />} exact />
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
