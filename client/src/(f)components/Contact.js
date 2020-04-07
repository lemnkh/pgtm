import React from 'react';
import Layout from '../(f)components/Layout';
import '../regularpage.css';

class Contact extends React.Component {
    state = {
       // pour gérer FR/EN
    };

  render() {  
    return (
        <Layout history={this.props.history}>

            <span className="page-title">Get in touch</span>
            
            <div className="page-content">
                <p><b>Email : </b> <a href="mailto:contactpgtm@gmail.com" target="_blank" rel="noopener noreferrer">contactpgtm@gmail.com</a></p>

                <p><b>Facebook :</b> <a href="https://www.facebook.com/popgoesthemusic/" target="_blank" rel="noopener noreferrer">Pop Goes the Music</a></p>
                
                <p><b>Instagram :</b> <a href="http://instagram.com/pop.goesthemusic" target="_blank" rel="noopener noreferrer">@pop.goesthemusic</a></p>

                <p><b>Twitter :</b> <a href="https://twitter.com/popgtm" target="_blank" rel="noopener noreferrer">popgtm</a></p>

                <p><b>YouTube :</b> <a href="https://www.youtube.com/channel/UCexG7W7vpVKFJnnH4n-zK3w" target="_blank" rel="noopener noreferrer">Pop Goes the Music</a></p>

            </div>

        </Layout>
    );
  }
}
  
export default Contact;