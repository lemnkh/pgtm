import React, { Component } from 'react';
import Home from './(f)components/Home';
import SignUp from './(b)components/SignUp';
import Login from './(b)components/Login';
import AddRegularArticle from './(b)components/AddRegularArticle';
import EditRegularArticle from './(b)components/EditRegularArticle';
import ListOfArticles from './(b)components/ListOfArticles';
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
          <Route path='/pgtm/admin/signup' render={(props) => <SignUp getUser={this.getTheUser} history={props.history} />}/>
          <Route path='/pgtm/admin/login' render={(props) => <Login getUser={this.getTheUser} history={props.history} />}/>
          <Route exact path='/pgtm/admin/articles/new' component={AddRegularArticle}/>
          <Route exact path='/pgtm/admin/articles/:id' component={EditRegularArticle}/>
          <Route exact path='/pgtm/admin/articles' component={ListOfArticles}/>
        </Switch>

      </div>
    );
  }
}

export default App;