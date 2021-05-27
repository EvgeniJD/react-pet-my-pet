import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Posts from './components/Posts';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Profile from './components/User/Profile';
import AddPost from './components/Posts/AddPost';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/" component={Posts} exact/>
        <Route path="/user/login" component={Login} />
        <Route path="/user/register" component={Register} />
        <Route path="/user/profile/:id" component={Profile} />
        <Route path="/add-post" component={AddPost} />
      </Switch>
    </div>
  );
}

export default App;
