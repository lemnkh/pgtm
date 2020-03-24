import React from 'react';
import NavBar from '../(f)components/NavBar';
import Newsletter from '../(f)components/Newsletter';
import Logo from '../(f)components/Logo';

class Header extends React.Component {
    render() {
      return (
        <div className="Header">
            <Newsletter />
            <Logo />
            <NavBar />
        </div>
      );
    }
  }
export default Header;