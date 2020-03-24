import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
    render() {
      return (
        <div className="NavBar">
            <ul className="nav">
                <li>
                <Link to="/">
                    Home
                </Link>
                </li>
                <li>
                <Link to="/about">
                    About
                </Link>
                </li>
                <li>
                <Link to="/Contact">
                    Contact
                </Link>
                </li>
                <li>
                <Link to="/">
                    Something
                </Link>
                </li>
            </ul>
        </div>
      );
    }
  }
  
export default NavBar;