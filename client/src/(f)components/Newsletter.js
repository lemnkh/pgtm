import React from 'react';
import { Link } from "react-router-dom";
import Mailchimp from 'react-mailchimp-form'

class Newsletter extends React.Component {
  state = {
    newsletter: "block",
    back: "none"
  }

  componentDidMount = () => {
    if (this.props.history.location.pathname === "/") {
    this.setState({
      newsletter: "block",
      back: "none"
    })
  } else {
    this.setState({
      newsletter: "none",
      back: "block"
    })
    }
  }

  goBack = () => {
    this.props.history.goBack()
  }

  openNewsletter = () => {
    document.getElementById("myNewsletter").style.height = "100%";
}

  closeNewsletter = () => {
    document.getElementById("myNewsletter").style.height = "0";
}

    render() {
      return (

        <div className="navbar-sides">
          <div className="center" style={{display: this.state.newsletter}} onClick={this.openNewsletter}>
            <img src="/newsletter.png" alt="newsletter" className="navbar" onClick={this.signUpForNewsletter} /><br/>
            <span className="navbar-text">Mail list</span>
          </div>
          <div id="myNewsletter" className="overlay">
                    <div onClick={this.closeNewsletter}>
                        <img src="/close.png" alt="menu" className="menu-close"/>
                    </div>

                    <div className="center-middle">
                        <div className="overlay-content">
                          <div className="newsletter-title">get an email alert whenever a new article is posted!</div>
                          <div className="newsletter-bg">
                            <Mailchimp
                            action='https://popgoesthemusic.us19.list-manage.com/subscribe/post?u=125fccd301c648dd46dba03b0&amp;id=999db860b9'
                            fields={[
                              {
                                name: 'EMAIL',
                                placeholder: 'Email',
                                type: 'email',
                                required: true
                              }
                            ]}
                            messages = {
                              {
                                sending: "Sending...",
                                success: "Thank you for subscribing! We'll keep in touch ✨",
                                error: "An unexpected internal error has occurred :(",
                                empty: "Uh-uh, you must write an e-mail.",
                                duplicate: "Too many subscribe attempts for this email address",
                                button: "Subscribe"
                              }
                            }
                            />
                          </div>
                            {/* https://popgoesthemusic.us19.list-manage.com/subscribe/post?u=125fccd301c648dd46dba03b0&amp;id=999db860b9 */}
                        </div>
                    </div>
                </div>

          <div className="center" style={{display: this.state.back}}>
            <img src="/back.png" alt="back" className="navbar" onClick={this.goBack} /><br/>
            <span className="navbar-text">Back</span>
          </div>
        </div>
      );
    }
  }
  
export default Newsletter;