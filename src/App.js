import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Posts from './components/Posts';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Profile from './components/User/Profile';

import UserContext from './contexts/UserContext';

import './App.css';

function App() {
  const [isInAddPostMode, setIsInAddPostMode] = useState(false);
  function addPostChangeMode() {
    setIsInAddPostMode((oldValue) => !oldValue);
  }

  return (
    <div className="App">
      <UserContext.Provider value={{}}>
        <Header onAddPostBtnClickHandler={addPostChangeMode} />

        <Switch>
          <Route path="/" render={() => <Posts isInAddPostMode={isInAddPostMode} onCancelAddPost={addPostChangeMode} />} exact />
          <Route path="/user/login" component={Login} />
          <Route path="/user/register" component={Register} />
          <Route path="/user/profile/:id" component={Profile} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
