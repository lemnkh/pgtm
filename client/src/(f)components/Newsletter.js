import React from 'react';

class Newsletter extends React.Component {
    render() {
      return (
        <div className="navbar-sides">
          <div className="center">
              <img src="/newsletter.png" alt="newsletter" className="navbar" /><br/>
              <span className="navbar-text">Mail list</span>
          </div>
        </div>
      );
    }
  }
  
export default Newsletter;