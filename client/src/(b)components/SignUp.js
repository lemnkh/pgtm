import React from 'react';
import AuthService from '../components/AuthService';
import { Link } from 'react-router-dom'; 

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    // profilePic: ''
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
    .catch(error => console.log(error))
  
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
      
          <p className="under-submit">
            Do you already have an account?<br/>
            Awesome, let's get you <Link to="/pgtm/admin/login"><b>logged in</b></Link>!
          </p>
        </form>
      </div>
    );
  }
}
  
export default SignUp;