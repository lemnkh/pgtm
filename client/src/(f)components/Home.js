import React from 'react';
import Layout from '../(f)components/Layout';
import AddRegularArticle from '../(b)components/AddRegularArticle';

class Home extends React.Component {
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
        <div className="App">
            <Layout>
                <h1>Welcome to our website!</h1>

                <AddRegularArticle addTheRegularArticle={this.addRegularArticleHandler}  />
            </Layout>
        </div>
    );
  }
}
  
export default Home;