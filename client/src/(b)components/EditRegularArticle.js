import React from 'react';
import ArticlesService from '../components/ArticlesService';

class EditRegularArticle extends React.Component {
    state = {
        title: "",
        overview: "", /* résumé de l'article */
        picFeatured: "", /* image de Une */
        picCaption: "", /* légende image de Une */
        picCredit: "", /* crédit image de Une */
        author: "",
        authorTwitter: "",
        authorIG: "",
        chapo: "",
        articleContent: "", /* contenu de l'article */
        lang: "", /* langue pour filtrer plus tard */
        cat: "", /* catégorie */
        tags: "",
        selectedLang: "french",
        selectedCat: "Nouveaux artistes"
    };

    // comment charger existing data de l'article en state to edit ???

    service = new ArticlesService();

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    };
    
    handleOptionChange = (changeEvent) => {
        this.setState({
          selectedLang: changeEvent.target.value
        })
    };

    handleCheckboxChange = (changeEvent) => {
        this.setState({
          selectedCat: changeEvent.target.value
        })
    };

    handleSubmitForm = (event) => {
        event.preventDefault();
        const {title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags, selectedLang, selectedCat} = this.state;
        console.log(title);

        // on fait appel à l'instance du service spé articles
        this.service.editArticle(title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags, selectedLang, selectedCat)
            .then(response => {
                // on reset le form : est-ce que je le garde la modif ???
                this.setState({
                    title: "",
                    overview: "", /* résumé de l'article */
                    picFeatured: "", /* image de Une */
                    picCaption: "", /* légende image de Une */
                    picCredit: "", /* crédit image de Une */
                    author: "",
                    authorTwitter: "",
                    authorIG: "",
                    chapo: "",
                    articleContent: "", /* contenu de l'article */
                    lang: "", /* langue pour filtrer plus tard */
                    cat: "", /* catégorie */
                    tags: "",
                    selectedLang: "french",
                    selectedCat: "Nouveaux artistes"
                });

                // calling the parent
                // do I really need this bit????
                this.props.addTheArticle(this.state);
            })
            .catch(error => console.log(error))    
    };

    render() {
        return (
            <div className="regular-article">
                <form onSubmit={this.handleSubmitForm} enctype="multipart/form-data">
                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Title:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                </p>

                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Overview:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="overview"
                            value={this.state.overview}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                </p>

                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Featured picture:</div>
                        <div className="field-content">
                            <input
                            type="file"
                            name="picFeatured"
                            value={this.state.picFeatured}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                </p>

                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Caption:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="picCaption"
                            value={this.state.picCaption}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                </p>

                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Credit:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="picCredit"
                            value={this.state.picCredit}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                </p>

                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Author:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="author"
                            value={this.state.author}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                </p>

                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Author's Twitter username:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="authorTwitter"
                            value={this.state.authorTwitter}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                </p>

                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Author's Instagram username:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="authorIG"
                            value={this.state.authorIG}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                </p>

                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Lead (chapô):</div>
                        <div className="field-content">
                            <textarea
                            name="chapo"
                            value={this.state.chapo}
                            onChange={(e) => this.handleChange(e)}>
                            </textarea>
                        </div>
                        </div>
                    </label>
                </p>

                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Article:</div>
                        <div className="field-content">
                            <textarea
                            name="articleContent"
                            value={this.state.articleContent}
                            onChange={(e) => this.handleChange(e)}>
                            </textarea>
                        </div>
                        </div>
                    </label>
                </p>

                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Language:</div>
                        <div className="field-content">
                            <input
                            type="radio"
                            name="language"
                            value="french"
                            checked={this.state.selectedLang === "french"}
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                            />
                            french

                            <input
                            type="radio"
                            name="language"
                            value="english"
                            checked={this.state.selectedLang === "english"}
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                            />
                            english
                        </div>
                        </div>
                    </label>
                </p>

                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Category:</div>
                        <div className="field-content">
                            <input
                            type="checkbox"
                            name="cat"
                            value="Nouveaux artistes"
                            checked={this.state.selectedCat === "Nouveaux artistes"}
                            onChange={this.handleCheckboxChange}
                            className="form-check-input"
                            />
                            Nouveaux artistes

                            <input
                            type="checkbox"
                            name="cat"
                            value="Rencontres"
                            checked={this.state.selectedCat === "Rencontres"}
                            onChange={this.handleCheckboxChange}
                            className="form-check-input"
                            />
                            Rencontres

                            <input
                            type="checkbox"
                            name="cat"
                            value="Concerts"
                            checked={this.state.selectedCat === "Concerts"}
                            onChange={this.handleCheckboxChange}
                            className="form-check-input"
                            />
                            Concerts
                        </div>
                        </div>
                    </label>
                </p>

                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Tags:</div>
                        <div className="field-content">
                            <input
                            type="text"
                            name="tags"
                            value={this.state.tags}
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                        </div>
                    </label>
                </p>

                <center>
                    <button type="submit">Save</button>
                </center>
                </form>
            </div>
        );
    }

}

export default EditRegularArticle;