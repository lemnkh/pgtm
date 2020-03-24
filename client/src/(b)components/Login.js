import React from 'react';
import AuthService from '../components/AuthService';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;

    // là on fait appel à l'instance d'AuthService qu'on a créée
    this.service.login(email, password)
    .then( response => {
      console.log("je suis dans le then du service.login")
      // on reset le form
      this.setState({
        email: "",
        password: ""
      });
      this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  render() {
    return (
        <div className="center-page">
        <form className="center-form" onSubmit={this.handleFormSubmit}>

            <label>
              <div className="field">
                <div className="field-name">Email:</div>
                <div className="field-content">
                  <input
                  type="text"
                  name="email" 
                  value={this.state.email}
                  onChange={ e => this.handleChange(e)}/>
                </div>
              </div>
            </label>
          
            <label>
              <div className="field">
                <div className="field-name">Password:</div>
                <div className="field-content">
                  <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={ e => this.handleChange(e)}/>
                </div>
              </div>
            </label>
          
      
          <button type="submit">Log in</button>
      
          <p className="under-submit">
            You don't have an account yet?<br/>
            You can <b><Link to="npp/admin/signup">sign up</Link></b>.
          </p>
        </form>
      </div>
    );
  }
}
  
export default Login;