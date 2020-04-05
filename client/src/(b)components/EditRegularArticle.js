import React from 'react';
import ArticlesService from '../components/ArticlesService';
import '../Back.css';

class EditRegularArticle extends React.Component {
    state = {
        article: {}
        // title: "",
        // overview: "", /* résumé de l'article */
        // picFeatured: "", /* image de Une */
        // picCaption: "", /* légende image de Une */
        // picCredit: "", /* crédit image de Une */
        // author: "",
        // authorTwitter: "",
        // authorIG: "",
        // chapo: "",
        // articleContent: "", /* contenu de l'article */
        // lang: "", /* langue pour filtrer plus tard */
        // cat: "", /* catégorie */
        // lang: "🇫🇷",
        // cat: "Nouveaux artistes"
        // tags: "",
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
                        <div className="field-name">Title:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="title"
                            value={this.state.article.title}
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
                            value={this.state.article.overview}
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
                            onChange={(e) => this.handleUpload(e)} />
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
                            value={this.state.article.picCaption}
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
                            value={this.state.article.picCredit}
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
                            value={this.state.article.author}
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
                            value={this.state.article.authorTwitter}
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
                            value={this.state.article.authorIG}
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
                            value={this.state.article.chapo}
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
                            value={this.state.article.articleContent}
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
                            checked={this.state.article.lang === "🇫🇷"}
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                            />
                            🇫🇷

                            <input
                            type="radio"
                            name="language"
                            value="🇬🇧"
                            checked={this.state.article.lang === "🇬🇧"}
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
                            checked={this.state.article.cat === "Nouveaux artistes"}
                            onChange={this.handleCheckboxChange}
                            className="form-check-input"
                            />
                            Nouveaux artistes

                            <input
                            type="checkbox"
                            name="cat"
                            value="Rencontres"
                            checked={this.state.article.cat === "Rencontres"}
                            onChange={this.handleCheckboxChange}
                            className="form-check-input"
                            />
                            Rencontres

                            <input
                            type="checkbox"
                            name="cat"
                            value="Concerts"
                            checked={this.state.article.cat === "Concerts"}
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
                            value={this.state.article.tags}
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

export default EditRegularArticle;