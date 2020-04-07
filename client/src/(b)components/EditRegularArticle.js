import React from 'react';
import ArticlesService from '../components/ArticlesService';
import '../Back.css';

class EditRegularArticle extends React.Component {
    state = {
        article: {}
    };
    
    service = new ArticlesService();

    componentDidMount = () => {
        // if not logged in, redirect
        if (!this.props.status) {
            this.props.history.push('/pgtm/admin/login');
            return;
        }

        this.service.getArticle(this.props.match.params.id)
            .then(article => this.setState({article}))
            .catch(error => console.log(error))
    };

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({
            article: {
                ...this.state.article,
                [name]: value,
            }
        });
    };
    
    handleOptionChange = (changeEvent) => {
        this.setState({
            article: {
                ...this.state.article, // needed pour qu'il garde ce qui est déjà saisi sinon il remplacera le state juste par le article: {selectedLang: blabla}
                lang: changeEvent.target.value
            }
        })
    };

    handleCheckboxChange = (changeEvent) => {
        this.setState({
            article: {
                ...this.state.article,
                cat: changeEvent.target.value
            }
        })
    };

    handleSubmitForm = (event) => {
        event.preventDefault();

        if (!this.state.picFeatured) return;
        
        const {title, overview, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags} = this.state.article;
        const picFeatured = this.state.picFeatured;
        // on fait appel à l'instance du service spé articles
        this.service.updateArticle(this.props.match.params.id, title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags)
            .then(response => {
                
                // redirect
                this.props.history.push('/pgtm/admin/articles');

                console.log("DURING UPDATE", this.state.article.picFeatured)
            })
            .catch(error => console.log(error))    
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

    render() {
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
                        <div className="field-name"><span>Article:</span></div>
                        
                            <textarea
                            name="articleContent"
                            value={this.state.articleContent}
                            onChange={(e) => this.handleChange(e)}
                            class="field-input" >
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
                        <div className="field-name"><span>Category:</span></div>
                        
                            <input
                            type="checkbox"
                            name="cat"
                            value="Nouveaux artistes"
                            checked={this.state.cat === "Nouveaux artistes"}
                            onChange={this.handleCheckboxChange}
                            className="form-check-input"
                            />
                            Nouveaux artistes

                            <input
                            type="checkbox"
                            name="cat"
                            value="Rencontres"
                            checked={this.state.cat === "Rencontres"}
                            onChange={this.handleCheckboxChange}
                            className="form-check-input"
                            />
                            Rencontres

                            <input
                            type="checkbox"
                            name="cat"
                            value="Concerts"
                            checked={this.state.cat === "Concerts"}
                            onChange={this.handleCheckboxChange}
                            className="form-check-input"
                            />
                            Concerts
                        
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
                    <button className="button" type="submit">Save</button>
                </center>
                </form>
            </div>
        );
    }

}

export default EditRegularArticle;