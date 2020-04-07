import React from 'react';
import AuthService from '../components/AuthService';
import { Link } from 'react-router-dom';
import '../Back.css';

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    // profilePic: ''
    errorMessage: '',
    displayErr: 'none'
  };

  service = new AuthService();

  

  handleFormSubmit = (event) => {
    
    event.preventDefault();

    // if (!this.state.profilePic) return;

    console.log("state avant service.signup", this.state);

    // là on fait appel à l'instance d'AuthService qu'on a créée
    this.service.signup(this.state)
    .then(response => {
      console.log("pp in the state right dans submit", this.state.profilePic);
      console.log("je suis dans le then du service.signup", response);

      // pour garder la session du user passée en props depuis App.js
      this.props.updateUser(response);

      // on reset le form pour que protéger les infos du user
      this.setState({
        name: "", 
        email: "",
        password: "",
        // profilePic: ""
      });

      // redirect
      this.props.history.push("/pgtm/admin/articles");
    })
    .catch(error => {
      this.setState({
        errorMessage: error.response.data.message,
        displayErr: 'block'})
    })
  
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  // handleUpload = (event) => {
  //   const uploadData = new FormData();
  //   uploadData.append("profilePic", event.target.files[0]);
    
  //   this.service.upload(uploadData)
  //       .then(response => {
  //           this.setState({ profilePic: response.secure_url });
  //           console.log("dans then upload", this.state.profilePic)
  //       })
  //       .catch(err => {
  //           console.log("Error while uploading the file: ", err);
  //       })
  // };

  render() {
    return (
        <div className="center-page">
        <form className="center-form" onSubmit={this.handleFormSubmit}>
          
            <label>
              <div className="field">
                <div className="field-name"><span>Name:</span></div>
                
                  <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={ e => this.handleChange(e)}
                  class="field-input"/>
                
              </div>
            </label>
          
      
          
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
          
      
          
            {/* <label>
              <div className="field">
                <div className="field-name">Profile picture:</div>
                <div className="field-content">
                  <input
                  type="file"
                  onChange={(e) => this.handleUpload(e)}/>
                </div>
              </div>
            </label> */}
          
          <button className="button" type="submit">Sign up</button>
        </form>

        <div className="under-submit">
              You already have an account?<br/>
              You can <b><Link to="/pgtm/admin/login">log in</Link></b>!
            <center>
              <div className="error-message" style={{display: this.state.displayErr}}>{this.state.errorMessage}</div>
            </center>
        </div>

      </div>
    );
  }
}
  
export default SignUp;