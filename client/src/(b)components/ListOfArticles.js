import React from 'react';
import AddRegularArticle from './AddRegularArticle';

class ListOfArticles extends React.Component {
    addRegularArticleHandler = (article) => {
        // const moviesCopy = [...this.state.movies]; // copy!
    
        // moviesCopy.push(article); // add
    
        // this.setState({
        //   movies: moviesCopy
        // })
    }
    
    render() {
        return (
        <div>
            <AddRegularArticle addTheArticle={this.addRegularArticleHandler} /> 
        </div>
        )
    }
}

export default ListOfArticles;