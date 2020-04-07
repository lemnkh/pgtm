import React from 'react';
import Layout from '../(f)components/Layout';
import HomeFeed from '../(f)components/HomeFeed';
import HomePlaylists from '../(f)components/HomePlaylists';
import PublicService from '../components/PublicService';
import { Link } from 'react-router-dom';
import '../homepage.css';

class Home extends React.Component {
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
        
      <Layout history={this.props.history}>
      {/* <div className="separator"></div>    */}
      <Link to={"/" + this.state.latest[0]._id}><div className="latest">
        
          <img src={this.state.latest[0].picFeatured} alt="latest article" className="latest-pic" />
       

        <div className="latest-info">
          <span className="label-article">Latest article</span>
          <div className="latest-overview">
          <Link to={"/" + this.state.latest[0]._id}>
            <span className="latest-title">{this.state.latest[0].title}</span>
          </Link>
          <br/>
          </div>
        </div>
      </div></Link>

      <div className="latest-subtitle">{this.state.latest[0].overview}</div>

      <div className="section">
        <div className="center">
          <span className="section-title">The Feed</span>

          <HomeFeed />

          <div className="more-link">+ <Link to="/articles/all">all articles</Link></div>
          </div>
      </div>
      <div className="section-bis">
        <div className="center">
          <span className="section-title">The Playlists</span>

          <HomePlaylists />

          <div className="more-link">+ <Link to="/playlists/all">all playlists</Link></div>
        </div>
      </div>

      </Layout>
      
    );
  }
}
  
export default Home;