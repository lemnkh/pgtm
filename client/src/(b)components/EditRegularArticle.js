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
        // lang: "french",
        // cat: "Nouveaux artistes"
        // tags: "",
    };
    
    service = new ArticlesService();

    componentDidMount = () => {
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
        const {title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags} = this.state.article;
        console.log(title);

        // on fait appel à l'instance du service spé articles
        this.service.updateArticle(this.props.match.params.id, title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags)
            .then(response => {
                // on reset le form : est-ce que je le garde la modif ???
                // this.setState({
                //     title: "",
                //     overview: "", /* résumé de l'article */
                //     picFeatured: "", /* image de Une */
                //     picCaption: "", /* légende image de Une */
                //     picCredit: "", /* crédit image de Une */
                //     author: "",
                //     authorTwitter: "",
                //     authorIG: "",
                //     chapo: "",
                //     articleContent: "", /* contenu de l'article */
                //     lang: "french",
                //     cat: "Nouveaux artistes",
                //     tags: ""
                // });

                // calling the parent
                // do I really need this bit????
                // this.props.addTheArticle(this.state);
                console.log("ok", response)
            })
            .catch(error => console.log(error))    
    };

    render() {
        console.log("test", this.state);
        console.log("props", this.props);
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
            

                
                    {/* <label>
                        <div className="field">
                        <div className="field-name">Featured picture:</div>
                        <div className="field-content">
                            <input
                            type="file"
                            name="picFeatured"
                            value={this.state.article.picFeatured}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
             */}

                
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
                            value="french"
                            checked={this.state.article.lang === "french"}
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                            />
                            french

                            <input
                            type="radio"
                            name="language"
                            value="english"
                            checked={this.state.article.lang === "english"}
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                            />
                            english
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