import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Posts from './components/Posts';
import Login from './components/User/Login';
import Register from './components/User/Register';


import './App.css';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/" component={Posts} exact/>
        <Route path="/user/login" component={Login} />
        <Route path="/user/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
