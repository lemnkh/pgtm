import React from 'react';
import Header from '../(f)components/Header';
import Footer from '../(f)components/Footer';

class Layout extends React.Component {
    render() {
      console.log("history in layout", this.props.history)
      return (
        <div className="layout">
            <div className="navbar-on-top">
              <Header history={this.props.history} />
            </div>
        
            <div className="content-site">{this.props.children}</div>
        
            <Footer />
        </div>
      );
    }
  }
export default Layout;