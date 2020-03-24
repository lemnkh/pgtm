import React, { Component } from 'react';
import Home from './(f)components/Home';
import SignUp from './(b)components/SignUp';
import Login from './(b)components/Login';
import AddRegularArticle from './(b)components/AddRegularArticle';
import { Switch, Route } from 'react-router-dom';
import AuthService from './components/AuthService';

class App extends Component {

  state = {
    loggedInUser: null
  }

  service = new AuthService();

  fetchUser() {
    if (this.state.loggedInUser === null){
      this.service.loggedin()
        .then(response => {
          this.setState({loggedInUser: response})
        })
        .catch(err => {
          this.setState({loggedInUser: false}) 
        })
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    return (
      <div className="App">

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/npp/admin/signup' render={() => <SignUp getUser={this.getTheUser}/>}/>
          <Route path='/npp/admin/login' render={() => <Login getUser={this.getTheUser}/>}/>
          <Route path='/npp/admin/create-article' component={AddRegularArticle}/>
        </Switch>

      </div>
    );
  }
}

export default App;