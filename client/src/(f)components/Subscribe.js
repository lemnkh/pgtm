import React from 'react';

class Subscribe extends React.Component {
    state = {
        name: "",
        email: ""
    };

    componentDidMount = () => {
    
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    handleSubmitForm = (event) => {
        event.preventDefault();

        // whatevs
    };

    render() {
        return (
            <div className="newsletter-form">
                <form onSubmit={this.handleSubmitForm} encType="multipart/form-data">
                <p>
                    <label>
                        <div className="field">
                        <div className="field-name">Name:</div>
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
                        <div className="field-name">Email:</div>
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

                <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true">
                    <input type="text" name="b_eb05e4f830c2a04be30171b01_8281a64779" tabindex="-1" value=""/>
                </div>
                <div className="clear">
                    <input type="submit" value="subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/>
                </div>
{/* 
                <center>
                    <button type="submit">Save</button>
                </center> */}
                </form>
            </div>
        );
    }

}

export default Subscribe;