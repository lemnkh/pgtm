import React from 'react';
import Layout from '../(f)components/Layout';
import PublicService from '../components/PublicService';

class Home extends React.Component {
  // state = {
  //   selected: "french"
  // }

  // handleOptionChange = (changeEvent) => {
  //   this.setState({
  //     selected: changeEvent.target.value
  //   })
  // }

  state = {
    latest: [{}] // faut déclarer objet dans tableau parce que c'est le type de réponse que l'on reçoit dans latestArticle
    // le componentDidMount est un second render donc faut que le type vide dans le state match ce avec quoi on va remplir
  }

  service = new PublicService();

  componentDidMount = () => {
    this.service.latestArticle()
      .then(response => {
        this.setState({
          latest: response
        })
        console.log("resp", this.state.latest[0].title);
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
        <div className="App">
            <Layout>
               
            <img src={this.state.latest[0].featuredPic} alt="featured" />
            {this.state.latest[0].title}
            </Layout>
        </div>
    );
  }
}
  
export default Home;