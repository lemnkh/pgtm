import React, { Component } from 'react';
import TextEditor from './components/TextEditor';
import Home from './(f)components/Home';
import About from './(f)components/About';
import Contact from './(f)components/Contact';
import Team from './(f)components/Team';
import PublishedArticle from './(f)components/PublishedArticle';
import PublishedPlaylist from './(f)components/PublishedPlaylist';
import Articles from './(f)components/Articles';
import Playlists from './(f)components/Playlists';
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
import NotFound from './components/NotFound';

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
          <Route exact path='/' onUpdate={() => window.scrollTo(0, 0)} component={Home}/>

          <Route exact path='/editor' component={TextEditor}/>

          <Route exact path='/pgtm/admin/signup' render={(props) => <SignUp status={this.state.logged} updateUser={this.updateTheUser} history={props.history} />}/>
          <Route exact path='/pgtm/admin/login' render={(props) => <Login status={this.state.logged} updateUser={this.updateTheUser} history={props.history} />}/>
          <Route exact path='/pgtm/admin/profile' render={(props) => <Profile status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          <Route exact path='/pgtm/admin/articles/new' onUpdate={() => window.scrollTo(0, 0)} render={(props) => <AddRegularArticle status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          <Route exact path='/pgtm/admin/playlists/new' onUpdate={() => window.scrollTo(0, 0)} render={(props) => <AddPlaylist status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          <Route exact path='/pgtm/admin/articles/:id' onUpdate={() => window.scrollTo(0, 0)} render={(props) => <EditRegularArticle status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          <Route exact path='/pgtm/admin/playlists/:id' onUpdate={() => window.scrollTo(0, 0)} render={(props) => <EditPlaylist status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          <Route exact path='/pgtm/admin/articles' onUpdate={() => window.scrollTo(0, 0)} render={(props) => <ListOfArticles status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} />}/>

          <Route exact path='/about' onUpdate={() => window.scrollTo(0, 0)} component={About}/>
          <Route exact path='/contact' onUpdate={() => window.scrollTo(0, 0)} component={Contact}/>
          <Route exact path='/team' onUpdate={() => window.scrollTo(0, 0)} component={Team}/>
          
          <Route exact path='/article/:id' onUpdate={() => window.scrollTo(0, 0)} render={(props) => <PublishedArticle status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          
          <Route exact path='/articles/all' onUpdate={() => window.scrollTo(0, 0)} render={(props) => <Articles status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>
          <Route exact path='/playlists/all' onUpdate={() => window.scrollTo(0, 0)} render={(props) => <Playlists status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>

          <Route exact path='/playlist/:id' onUpdate={() => window.scrollTo(0, 0)} render={(props) => <PublishedPlaylist status={this.state.logged} user={this.state.user} updateUser={this.updateTheUser} history={props.history} match={props.match} />}/>

          <Route path='*' onUpdate={() => window.scrollTo(0, 0)} component={NotFound} />
        </Switch>

      </div>
    );
  }
}

export default App;