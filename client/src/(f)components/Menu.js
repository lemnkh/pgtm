import React from 'react';
import { Link } from 'react-router-dom'

class Menu extends React.Component {
    state ={
        display: "none"
    }

    componentDidMount = () => {
        if (this.props.logged === true) {
            this.setState({
                menu: "block"
            });
        } else {
            this.setState({
                menu: "none"
            });
        }
    }

    openMenu = () => {
        document.getElementById("myMenu").style.height = "100%";
    }

    closeMenu = () => {
        document.getElementById("myMenu").style.height = "0";
    }

    render() {
        return (
            <div>
                <div className="navbar-sides">
                    <div className="center" onClick={this.openMenu}>
                        <img src="/menu.png" alt="menu" className="navbar"/><br/>
                        <span className="navbar-text">Menu</span>
                    </div>
                    <div id="myMenu" className="overlay">
                    <div onClick={this.closeMenu}>
                        <img src="/close.png" alt="menu" className="menu-close"/>
                    </div>

                    <div className="center-middle">
                        <ul className="overlay-content">
                            <li className="menu-link-1">
                            <Link to="/">
                                Home
                            </Link>
                            </li>
                            <li className="menu-link-2">
                            <Link to="/about">
                                About
                            </Link>
                            </li>
                            <li className="menu-link-3">
                            <Link to="/contact">
                                Contact
                            </Link>
                            </li>
                            <li className="menu-link-1">
                            <Link to="/articles/all">
                                All articles
                            </Link>
                            </li>
                            <li className="menu-link-2">
                            <Link to="/playlists/all">
                                All playlists
                            </Link>
                            </li>
                            <li className="menu-link-3" style={{display: this.state.display}}>
                            <Link to="/pgtm/admin/articles">
                                Back office
                            </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        );
    }
  }
  
export default Menu;