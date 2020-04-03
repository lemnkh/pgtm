import React from 'react';

class Logo extends React.Component {
    render() {
      return (
        <div className="navbar-middle">
          <div className="center">
              <img src="/logo.png" alt="pop! goes the music" className="navbar-logo" />
          </div>
        </div>
      );
    }
  }
  
export default Logo;