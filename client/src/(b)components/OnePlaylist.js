import React from 'react';
import ArticlesService from '../components/ArticlesService';
import {Link} from 'react-router-dom';

class OnePlaylist extends React.Component {
    state ={

    } 

    service = new ArticlesService();

    delete = (event) => {
        event.preventDefault();
        this.service.deletePlaylist(this.props.id)
            .then(response => console.log("res", response)
            // insert refresh here
            )
            .catch(error => console.log(error))
    };

    render() {
        return(
            <div className="OnePlaylist">
                <li>
                    <div className="title">
                        <Link to={`/pgtm/admin/playlists/${this.props.id}`}>{this.props.title}</Link>
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
                        <Link to={`/pgtm/admin/playlists/${this.props.id}`}><img src="/edit.png" alt="EDIT" style={{width: "16px"}}/></Link> <Link to="/pgtm/admin/playlists/" onClick={this.delete}><img src="/delete.png" alt="DELETE" style={{width: "16px"}}/></Link> <Link to={"/article/" + this.props.id}><img src="/live.png" alt="SEE ON WEBSITE" style={{width: "16px"}}/></Link>
                    </div>
                </li>
                <li className="sep-articles">
                </li>
            </div>
        );
    }
}

export default OnePlaylist;