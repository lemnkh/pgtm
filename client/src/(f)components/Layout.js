import React from 'react';
import Header from '../(f)components/Header';
import Footer from '../(f)components/Footer';

class Layout extends React.Component {
    // state = {
    //   selected: "french"
    // }
  
    // handleOptionChange = (changeEvent) => {
    //   this.setState({
    //     selected: changeEvent.target.value
    //   })
    // }
  
    render() {
      return (
        <div className="layout">
            <div className="navbar-on-top">
              <Header />
            </div>
        
            <div className="content-site">{this.props.children}</div>
        
            <Footer />
        </div>
      );
    }
  }
export default Layout;