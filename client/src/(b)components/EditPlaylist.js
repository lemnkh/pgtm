import React from 'react';
import ArticlesService from '../components/ArticlesService';
import '../Back.css';

class EditPlaylist extends React.Component {
    state = {
        playlist: {} 
    };

    service = new ArticlesService();

    componentDidMount = () => {
        // if not logged in, redirect
        if (!this.props.status) {
            this.props.history.push('/pgtm/admin/login');
            return;
        }

        this.service.getPlaylist(this.props.match.params.id)
            .then(playlist => this.setState({playlist}))
            .catch(error => console.log(error))
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({
            playlist: {
                ...this.state.playlist,
                [name]: value,
            }
        });
    };
    
    handleUpload = (event) => {
        const uploadData = new FormData();
        uploadData.append("picFeatured", event.target.files[0]);
        
        this.service.uploadPicFeatured(uploadData)
            .then(response => {
                this.setState({ picFeatured: response.secure_url });
                console.log("dans then upload", this.state.picFeatured)
            })
            .catch(err => {
                console.log("Error while uploading the file: ", err);
            })
    };

    handleUploadPlaylist = (event) => {
        let formData = new FormData();
        formData.append("picPlaylist", event.target.files[0]);
    
        this.service.uploadPicPlaylist(formData)
          .then(response => {
              this.setState({ picPlaylist: response.secure_url });
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
            })
    };

    handleOptionChange = (changeEvent) => {
        this.setState({
            playlist: {
                ...this.state.playlist, // needed pour qu'il garde ce qui est déjà saisi sinon il remplacera le state juste par le article: {selectedLang: blabla}
                lang: changeEvent.target.value
            }
        })
    };

    handleCheckboxChange = (changeEvent) => {
        this.setState({
            playlist: {
                ...this.state.playlist,
                cat: changeEvent.target.value
            }
        })
    };

    handleSubmitForm = (event) => {
        event.preventDefault();

        if (!this.state.picPlaylist) return;

        var picFeatured = "";
        if (this.state.picFeatured) {
            picFeatured = this.state.picFeatured;
        } else {
            picFeatured = this.state.playlist.picFeatured
        }

        var picPlaylist = "";
        if (this.state.picPlaylist) {
            picPlaylist = this.state.picPlaylist;
        } else {
            picPlaylist = this.state.playlist.picPlaylist
        }

        const {title, overview, picCaption, picCredit, playlistSpotify, playlistDeezer, playlistYoutube, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags} = this.state.playlist;
        console.log(title);

        // on fait appel à l'instance du service spé articles
        this.service.updatePlaylist(this.props.match.params.id, title, overview, picFeatured, picCaption, picCredit, picPlaylist, playlistSpotify, playlistDeezer, playlistYoutube, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags)
            .then(response => {
                this.props.history.push('/pgtm/admin/articles');
            })
            .catch(error => console.log(error))    
    };

    render() {
        console.log(this.state);
        if (this.props.user === {}) {
            this.props.history.push('/pgtm/admin/login');
        }

        return (
            <div className="regular-article">
                <form onSubmit={this.handleSubmitForm} encType="multipart/form-data">
                
                    <label>
                        <div className="field">
                        <div className="field-name">Title:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="title"
                            value={this.state.playlist.title}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name">Overview:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="overview"
                            value={this.state.playlist.overview}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name">Featured picture:</div>
                        <div className="field-content">
                            <input
                            type="file"
                            name="picFeatured"
                            onChange={this.handleUpload} />
                        </div>
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name">Caption:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="picCaption"
                            value={this.state.playlist.picCaption}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name">Credit:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="picCredit"
                            value={this.state.playlist.picCredit}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>


                    <label>
                        <div className="field">
                        <div className="field-name">Playlist cover:</div>
                        <div className="field-content">
                            <input
                            type="file"
                            name="picPlaylist"
                            onChange={(e) => this.handleUploadPlaylist(e)} />
                        </div>
                        </div>
                    </label>


                    <label>
                        <div className="field">
                        <div className="field-name">Playlist on Spotify:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="playlistSpotify"
                            value={this.state.playlist.playlistSpotify}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>

 
                    <label>
                        <div className="field">
                        <div className="field-name">Playlist on Deezer:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="playlistDeezer"
                            value={this.state.playlist.playlistDeezer}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>


                    <label>
                        <div className="field">
                        <div className="field-name">Playlist on Youtube:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="playlistYoutube"
                            value={this.state.playlist.playlistYoutube}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>

                
                    <label>
                        <div className="field">
                        <div className="field-name">Author:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="author"
                            value={this.state.playlist.author}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name">Author's Twitter username:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="authorTwitter"
                            value={this.state.playlist.authorTwitter}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name">Author's Instagram username:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="authorIG"
                            value={this.state.playlist.authorIG}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name">Lead (chapô):</div>
                        <div className="field-content">
                            <textarea
                            name="chapo"
                            value={this.state.playlist.chapo}
                            onChange={(e) => this.handleChange(e)}>
                            </textarea>
                        </div>
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name">Article:</div>
                        <div className="field-content">
                            <textarea
                            name="articleContent"
                            value={this.state.playlist.articleContent}
                            onChange={(e) => this.handleChange(e)}>
                            </textarea>
                        </div>
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name">Language:</div>
                        <div className="field-content">
                            <input
                            type="radio"
                            name="language"
                            value="🇫🇷"
                            checked={this.state.playlist.lang === "🇫🇷"}
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                            />
                            🇫🇷

                            <input
                            type="radio"
                            name="language"
                            value="🇬🇧"
                            checked={this.state.playlist.lang === "🇬🇧"}
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                            />
                            🇬🇧
                        </div>
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name">Category:</div>
                        <div className="field-content">
                            <input
                            type="checkbox"
                            name="cat"
                            value="Nouveaux artistes"
                            checked={this.state.playlist.cat === "Nouveaux artistes"}
                            onChange={this.handleCheckboxChange}
                            className="form-check-input"
                            />
                            Nouveaux artistes

                            <input
                            type="checkbox"
                            name="cat"
                            value="Rencontres"
                            checked={this.state.playlist.cat === "Rencontres"}
                            onChange={this.handleCheckboxChange}
                            className="form-check-input"
                            />
                            Rencontres

                            <input
                            type="checkbox"
                            name="cat"
                            value="Concerts"
                            checked={this.state.playlist.cat === "Concerts"}
                            onChange={this.handleCheckboxChange}
                            className="form-check-input"
                            />
                            Concerts
                        </div>
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name">Tags:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="tags"
                            value={this.state.playlist.tags}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                

                <center>
                    <button type="submit">Save</button>
                </center>
                </form>
            </div>
        );
    }

}

export default EditPlaylist;