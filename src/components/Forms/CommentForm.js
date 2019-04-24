import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator'

class TopicForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: '',
            topicId: null,
            ajaxError: 'There was a server error the prevented the form from submitting.'
        };

        this.validator = new SimpleReactValidator({
        });

    };

    componentDidMount() {
        this.setState({
            topicId: this.props.selectedTopic.id
        })
    }

    componentWillUnmount() {
        this.reset()
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    reset = () => {
        this.setState({
            content: '',
            topicId: ''
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            await this.props.onHandleSubmit({ ...this.state })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const { selectedTopic } = this.props
        const { topicId } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <div className="control">
                        <textarea
                            onChange={this.handleInputChange}
                            value={this.state.content}
                            className="textarea"
                            placeholder="Content"
                            name="content"
                            rows="5"></textarea>
                            {this.validator.message('title', this.state.content, 'required')}

                    </div>
                </div>
                <input type="hidden" value={this.state.topicId} name="topicId"/>
                
                <div className="field is-grouped">
                    <div className="control">
                        <button
                            className="button is-blueish"
                            style={{
                                color: '#fff'
                            }}>Submit</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default TopicForm