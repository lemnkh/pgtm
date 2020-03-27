import React from 'react';
import ArticlesService from '../components/ArticlesService';
import {Link} from 'react-router-dom';

class OneArticle extends React.Component {
    state ={

    } 

    service = new ArticlesService();

    delete = (event) => {
        event.preventDefault();
        this.service.deleteArticle(this.props.id)
            .then(response => console.log("res", response)
            // insert refresh here
            )
            .catch(error => console.log(error))
    };

    render() {
        return(
            <div className="OneArticle">
                <li>
                    <div className="title">
                        <Link to={`/pgtm/admin/articles/${this.props.id}`}>{this.props.title}</Link>
                    </div>

                    <div className="author">
                        {this.props.author}
                    </div>
                    
                    <div className="date">
                        {this.props.createdAt}
                    </div>

                    <div className="date">
                        {this.props.updatedAt}
                    </div>

                    <div className="action">
                        <Link to={`/pgtm/admin/articles/${this.props.id}`}>E</Link> <Link to="/pgtm/admin/articles/" onClick={this.delete}>D</Link>
                    </div>
                </li>
            </div>
        );
    }
}

export default OneArticle;