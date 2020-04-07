import React from 'react';
import ArticlesService from '../components/ArticlesService';
import '../back.css';

class AddRegularArticle extends React.Component {
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
        lang: "🇫🇷",
        cat: "Nouveaux artistes",
        tags: ""
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

    // handleUploadPlaylist = (event) => {
    //     let formData = new FormData();
    //     formData.append('photo', event.target.files[0]);
    
    //     this.service.uploadPicPlaylist(formData)
    //       .then(response => {
    //           this.setState({ picPlaylist: response.secure_url });
    //       })
    //       .catch(err => {
    //         console.log("Error while uploading the file: ", err);
    //         })
    // };

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

        if (!this.state.picFeatured) return;

        const {title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags} = this.state;
        console.log(title);

        // on fait appel à l'instance du service spé articles
        this.service.newArticle(title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags)
            .then(response => {
                // on reset le form
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
                    tags: ""
                });

                // calling the parent
                // do I really need this bit????
                //this.props.addTheArticle(this.state);

                this.props.history.push('/pgtm/admin/articles');
            })
            .catch(error => console.log(error))    
    };

    render() {
        console.log(this.props);
        if (this.props.user === {}) {
            this.props.history.push('/pgtm/admin/login');
        }

        return (
            <div className="regular-article">
                <form onSubmit={this.handleSubmitForm} encType="multipart/form-data">
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
                            onChange={this.handleUpload} />
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
                    <button className="button" type="submit">Save</button>
                </center>
                </form>
            </div>
        );
    }

}

export default AddRegularArticle;