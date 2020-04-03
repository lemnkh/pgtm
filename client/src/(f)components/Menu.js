import React from 'react';
// import { Link } from 'react-router-dom'

class Menu extends React.Component {
    render() {
        return (
            <div className="navbar-sides">
                <div className="center">
                    <img src="/menu.png" alt="menu" className="navbar"/><br/>
                    <span className="navbar-text">Menu</span>
                    
                    {/* <ul className="nav">
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
                    </ul> */}
                </div>
            </div>
        );
    }
  }
  
export default Menu;