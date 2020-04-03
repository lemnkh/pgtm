import React from 'react';
import Menu from '../(f)components/Menu';
import Newsletter from '../(f)components/Newsletter';
import Logo from '../(f)components/Logo';

class Header extends React.Component {
    render() {
      
      return (
        <div className="header">
            <Newsletter />
            <Logo />
            <Menu />
        </div>
      );
    }
  }
export default Header;