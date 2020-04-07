import React from 'react';
import ArticlesService from '../components/ArticlesService';
import '../Back.css';

class AddPlaylist extends React.Component {
    state = {
        title: "",
        overview: "", /* résumé de l'article */
        picFeatured: "", /* image de Une */
        picCaption: "", /* légende image de Une */
        picCredit: "", /* crédit image de Une */
        picPlaylist: "", /* SI PLAYLIST, image */
        playlistSpotify: "", /* SI PLAYLIST */
        playlistDeezer: "", /* SI PLAYLIST */
        playlistYoutube: "", /* SI PLAYLIST */
        author: "",
        authorTwitter: "",
        authorIG: "",
        chapo: "",
        articleContent: "", /* contenu de l'article */
        lang: "🇫🇷",
        cat: "Nouveaux artistes",
        tags: "",
        errorMessage: ""
    };

    service = new ArticlesService();

    componentDidMount = () => {
        // if not logged in, redirect
        if (!this.props.status) {
            this.props.history.push('/pgtm/admin/login');
            return;
        }
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
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
          lang: changeEvent.target.value
        })
    };

    handleCheckboxChange = (changeEvent) => {
        this.setState({
          cat: changeEvent.target.value
        })
    };

    handleSubmitForm = (event) => {
        event.preventDefault();

        if (!this.state.picPlaylist) return;

        const {title, overview, picFeatured, picCaption, picCredit, picPlaylist, playlistSpotify, playlistDeezer, playlistYoutube, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags} = this.state;
        console.log(title);

        console.log("submit");

        // on fait appel à l'instance du service spé articles
        this.service.newPlaylist(title, overview, picFeatured, picCaption, picCredit, picPlaylist, playlistSpotify, playlistDeezer, playlistYoutube, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags)
            .then(response => {
                // on reset le form
                this.setState({
                    title: "",
                    overview: "", /* résumé de l'article */
                    picFeatured: "", /* image de Une */
                    picCaption: "", /* légende image de Une */
                    picCredit: "", /* crédit image de Une */
                    picPlaylist: "", /* SI PLAYLIST, image */
                    playlistSpotify: "", /* SI PLAYLIST */
                    playlistDeezer: "", /* SI PLAYLIST */
                    playlistYoutube: "", /* SI PLAYLIST */
                    author: "",
                    authorTwitter: "",
                    authorIG: "",
                    chapo: "",
                    articleContent: "", /* contenu de l'article */
                    lang: "🇫🇷",
                    cat: "Nouveaux artistes",
                    tags: ""
                });

                this.props.history.push('/pgtm/admin/articles');
            })
            .catch(error => {
                this.setState({errorMessage: error.response.data.message})
            }) 
    };

    render() {
        console.log(this.props);
        if (this.props.user === {}) {
            this.props.history.push('/pgtm/admin/login');
        }

        return (
            <div className="regular-article">

                <form onSubmit={this.handleSubmitForm} encType="multipart/form-data">
                
                    
                    <label>
                        <div className="field">
                        <div className="field-name"><span>Title:</span></div>
                        
                            <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input" />
                        
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name"><span>Overview:</span></div>
                        
                            <input
                            type="text"
                            name="overview"
                            value={this.state.overview}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input" />
                        
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name"><span>Featured picture:</span></div>
                        
                            <input
                            type="file"
                            name="picFeatured"
                            onChange={this.handleUpload}
                            class="field-input" />
                        
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name"><span>Caption:</span></div>
                        
                            <input
                            type="text"
                            name="picCaption"
                            value={this.state.picCaption}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input" />
                        
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name"><span>Credit:</span></div>
                        
                            <input
                            type="text"
                            name="picCredit"
                            value={this.state.picCredit}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input" />
                        
                        </div>
                    </label>


                    <label>
                        <div className="field">
                        <div className="field-name"><span>Playlist cover:</span></div>
                        
                            <input
                            type="file"
                            name="picPlaylist"
                            onChange={(e) => this.handleUploadPlaylist(e)}
                            class="field-input" />
                        
                        </div>
                    </label>


                    <label>
                        <div className="field">
                        <div className="field-name"><span>Playlist on Spotify:</span></div>
                        
                            <input
                            type="text"
                            name="playlistSpotify"
                            value={this.state.playlistSpotify}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input" />
                        
                        </div>
                    </label>

 
                    <label>
                        <div className="field">
                        <div className="field-name"><span>Playlist on Deezer:</span></div>
                        
                            <input
                            type="text"
                            name="playlistDeezer"
                            value={this.state.playlistDeezer}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input" />
                        
                        </div>
                    </label>


                    <label>
                        <div className="field">
                        <div className="field-name"><span>Playlist on Youtube:</span></div>
                        
                            <input
                            type="text"
                            name="playlistYoutube"
                            value={this.state.playlistYoutube}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input" />
                        
                        </div>
                    </label>

                
                    <label>
                        <div className="field">
                        <div className="field-name"><span>Author:</span></div>
                        
                            <input
                            type="text"
                            name="author"
                            value={this.state.author}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input" />
                        
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name"><span>Author's Twitter username:</span></div>
                        
                            <input
                            type="text"
                            name="authorTwitter"
                            value={this.state.authorTwitter}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input" />
                        
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name"><span>Author's Instagram username:</span></div>
                        
                            <input
                            type="text"
                            name="authorIG"
                            value={this.state.authorIG}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input" />
                        
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name"><span>Lead (chapô):</span></div>
                        
                            <textarea
                            name="chapo"
                            value={this.state.chapo}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input">
                            </textarea>
                        
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name">
                            <span>Article:</span>
                        </div>
                        
                            <textarea
                            name="articleContent"
                            value={this.state.articleContent}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input"
                            id="container">
                            </textarea>
                        
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name"><span>Language:</span></div>
                        
                            <input
                            type="radio"
                            name="language"
                            value="🇫🇷"
                            checked={this.state.lang === "🇫🇷"}
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                            />
                            🇫🇷

                            <input
                            type="radio"
                            name="language"
                            value="🇬🇧"
                            checked={this.state.lang === "🇬🇧"}
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                            />
                            🇬🇧
                        
                        </div>
                    </label>
                

                
                    <label>
                        <div className="field">
                        <div className="field-name"><span>Tags:</span></div>
                        
                            <input
                            type="text"
                            name="tags"
                            value={this.state.tags}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input" />
                        
                        </div>
                    </label>
                

                <center>
                    <button type="submit" className="button">Save</button>
                </center>
                </form>
            </div>
        );
    }

}

export default AddPlaylist;