import React from 'react';

class Footer extends React.Component {
    render() {
      return (
        <div className="footer">
            <div className="copyright">© {new Date().getFullYear()} <b>Pop! Goes the Music</b></div>
        </div>
      );
    }
  }
  
export default Footer;