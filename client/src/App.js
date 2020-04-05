import React, { Component } from 'react';
import Home from './(f)components/Home';
import PublishedArticle from './(f)components/PublishedArticle';
import Articles from './(f)components/Articles';
import SignUp from './(b)components/SignUp';
import Login from './(b)components/Login';
import Profile from './(b)components/Profile';
import AddRegularArticle from './(b)components/AddRegularArticle';
import AddPlaylist from './(b)components/AddPlaylist';
import EditRegularArticle from './(b)components/EditRegularArticle';
import EditPlaylist from './(b)components/EditPlaylist';
import ListOfArticles from './(b)components/ListOfArticles';
import { Switch, Route } from 'react-router-dom';
import AuthService from './components/AuthService';

class App extends Component {

  state = {
    user: {},
    logged: false
  }

  service = new AuthService();

  fetchUser = () => {
    if (!this.state.user.id) {
      this.service.loggedin()
        .then(data => {
          console.log("data", data);
          if (!data) {
            this.setState({
              user: {},
              logged: false
            })
          } else {
              this.setState({
                user: data,
                logged: true
              })
          }
        }
        )
        .catch(err => console.log(err))
      ;
    } else {
      console.log('User already in the state: ', this.state.user)
    }
  };

  updateTheUser = (data) => {
    this.setState({
      user: data,
      logged: true
    });
  };

  componentDidMount() {
    this.fetchUser();
    console.log("logged", this.state.logged)
  }

  render() {
    return (
      <div className="App">

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/pgtm/admin/signup' render={(props) => <SignUp status={this.state.logged} updateUser={this.updateTheUser} history={props.history} />}/>
          <Route path='/pgtm/admin/login' render={(props) => <Login status={this.state.logged} updateUser={this.updateTheUser} history={props.history} />}/>
          <Route path='/pgtm/admin/profile' render={(props) => <Profile status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          <Route exact path='/pgtm/admin/articles/new' render={(props) => <AddRegularArticle status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          <Route exact path='/pgtm/admin/playlists/new' render={(props) => <AddPlaylist status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          <Route exact path='/pgtm/admin/articles/:id' render={(props) => <EditRegularArticle status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          <Route exact path='/pgtm/admin/playlists/:id' render={(props) => <EditPlaylist status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          <Route exact path='/pgtm/admin/articles' render={(props) => <ListOfArticles status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} />}/>

          <Route exact path='/:id' render={(props) => <PublishedArticle status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          <Route exact path='/articles/all' render={(props) => <Articles status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
        </Switch>

      </div>
    );
  }
}

export default App;