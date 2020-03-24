import React from 'react';

class Footer extends React.Component {
    render() {
      return (
        <div className="Footer">
            <div className="copyright">© {new Date().getFullYear()} Pop! Goes the Music</div>
        </div>
      );
    }
  }
  
export default Footer;