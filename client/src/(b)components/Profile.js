import React from 'react';
import AuthService from '../components/AuthService';
import '../back.css';

class Profile extends React.Component {
  state = {
    profile: {
      name: "",
      email: "",
      password: "",
      // profilePic: this.props.user.profilePic
    }
  };

  service = new AuthService();

  componentDidMount = () => {

    // if not logged in, redirect
    if (!this.props.status) {
      this.props.history.push('/pgtm/admin/login');
      return;
    }

    // if logged in, fetch profile
    if (this.props.status === true) {
      this.service.getProfile()
          .then(profile => {
            this.setState({profile});
            console.log("state here", this.state.profile);
            console.log("logged", this.props.status)
          })
          .catch(error => console.log(error))
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("state here", this.state.profile);
    

    // là on fait appel à l'instance d'AuthService qu'on a créée
    this.service.updateProfile(this.state.profile)
      .then(response => {
        console.log("je suis dans le then du service.signup")

      // pour garder la session du user
        console.log("response update:", response);
        this.props.updateUser(response);

        // on reset le form pour que protéger les infos du user
        this.setState({
          name: "", 
          email: "",
          password: "",
          // profilePic: this.props.user.profilePic
        });

        // redirect
        this.props.history.push('/pgtm/admin/articles');
      
      })
      .catch(error => console.log(error))
  
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({
        profile: {
            ...this.state.profile,
            [name]: value,
        }
    });
    };

  // handleUpload = (event) => {
  //   const uploadData = new FormData();
  //   uploadData.append("profilePic", event.target.files[0]);
    
  //   this.service.upload(uploadData)
  //       .then(response => {
  //           this.setState({ profile: {profilePic: response.secure_url} });
  //           console.log("dans then upload", this.state.profilePic)
  //       })
  //       .catch(err => {
  //           console.log("Error while uploading the file: ", err);
  //       })
  // };

  render() {
      console.log("these are the props", this.props.status);
      if (!this.props.user) {
        this.props.history.push('/pgtm/admin/login');
      }

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
                  value={this.state.profile.name}
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
                  value={this.state.profile.email}
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
                  name="profilePic"
                  onChange={(e) => this.handleUpload(e)}/>
                </div>
              </div>
            </label> */}
          
      
          <button className="button" type="submit">Save</button>
        </form>
      </div>
    );
  }
}
  
export default Profile;