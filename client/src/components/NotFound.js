import React from 'react';
import Layout from '../(f)components/Layout';

class NotFound extends React.Component {
    render() {
        return (
            <Layout history={this.props.history}>
                <center>
                <div style={{padding: "60px", paddingBottom: "40px"}}>
                    <img src="/cone.png" alt="not-found" style={{width: "40%"}} />
                    <h2>
                        The page you're trying to access doesn't exist
                    </h2>
                </div>
                </center>
            </Layout>
        )
    }
}

export default NotFound;