import React from 'react';

class Footer extends React.Component {
    render() {
      return (
        <div className="footer">
            <div className="socials">
              <a href="https://www.facebook.com/popgoesthemusic/" target="_blank"><img src="/facebook-home.png" alt="facebook"/></a>
              <a href="http://instagram.com/pop.goesthemusic" target="_blank"><img src="/instagram-home.png" alt="instagram"/></a>
              <a href="https://twitter.com/popgtm" target="_blank"><img src="/twitter-home.png" alt="twitter"/></a>
              <a href="https://www.youtube.com/channel/UCexG7W7vpVKFJnnH4n-zK3w" target="_blank"><img src="/youtube-home.png" alt="youtube"/></a>
            </div>

            <div className="copyright">© {new Date().getFullYear()} <b>Pop! Goes the Music</b></div>
        </div>
      );
    }
  }
  
export default Footer;