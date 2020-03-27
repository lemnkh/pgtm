import React from 'react';
import AuthService from '../components/AuthService';
import { Link } from 'react-router-dom'; 
import '../Back.css';

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    profilePic: ''
  };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();
    
    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;
    const picFeatured = this.state.picFeatured;

    // là on fait appel à l'instance d'AuthService qu'on a créée
    this.service.signup(name, email, password, picFeatured)
    .then(response => {
      console.log("je suis dans le then du service.signup")
      // on reset le form
      this.setState({
        name: "", 
        email: "",
        password: "",
        picFeatured: ""
      });
      // pour garder la session du user
      this.props.getUser(response);
      this.props.history.push('/pgtm/admin/articles');
    })
    .catch(error => console.log(error))
  
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  handleUpload = (event) => {
    let formData = new FormData();
    formData.append('photo', event.target.files[0]);

    AuthService.upload(formData)
      .then(response => {
        this.props.updateUser(response);
      });
  };

  render() {
    return (
        <div className="center-page">
        <form className="center-form" onSubmit={this.handleFormSubmit}>
          
            <label>
              <div className="field">
                <div className="field-name">Name:</div>
                <div className="field-content">
                  <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={ e => this.handleChange(e)}/>
                </div>
              </div>
            </label>
          
      
          
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
          
      
          
            <label>
              <div className="field">
                <div className="field-name">Profile picture:</div>
                <div className="field-content">
                  <input
                  type="file"
                  name="picFeatured"
                  value={this.state.picFeatured}
                  onChange={this.handleUpload}/>
                </div>
              </div>
            </label>
          
      
          <button type="submit">Sign up</button>
      
          <p className="under-submit">
            Do you already have an account?<br/>
            Awesome, let's get you <Link to="/pgtm/admin/login">logged in</Link>!
          </p>
        </form>
      </div>
    );
  }
}
  
export default SignUp;