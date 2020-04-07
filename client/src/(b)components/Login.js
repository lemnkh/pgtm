import React from 'react';
import AuthService from '../components/AuthService';
import { Link } from 'react-router-dom';
import '../Back.css';

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
      console.log("je suis dans le then du service.login, this is the response :", response)
      // on reset le form
      this.setState({
        email: "",
        password: ""
      });
      this.props.updateUser(response);
      this.props.history.push("/pgtm/admin/articles");
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
                <div className="field-name"><span>Email:</span></div>
                
                  <input
                  type="text"
                  name="email" 
                  value={this.state.email}
                  onChange={ e => this.handleChange(e)}
                  class="field-input"/>
                </div>
              
            </label>
          
            <label>
              <div className="field">
                <div className="field-name"><span>Password:</span></div>
                
                  <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={ e => this.handleChange(e)}
                  class="field-input"/>
                
              </div>
            </label>
          
      
          <button className="button" type="submit">Log in</button>
      
          <p className="under-submit">
            You don't have an account yet?<br/>
            You can <b><Link to="/pgtm/admin/signup">sign up</Link></b>.
          </p>
        </form>
      </div>
    );
  }
}
  
export default Login;