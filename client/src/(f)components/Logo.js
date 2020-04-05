import React from 'react';
import { Link } from 'react-router-dom';

class Logo extends React.Component {
    render() {
      return (
        <div className="navbar-middle">
          <div className="center">
            <Link to="/"><img src="/logo.png" alt="pop! goes the music" className="navbar-logo" /></Link>
          </div>
        </div>
      );
    }
  }
  
export default Logo;