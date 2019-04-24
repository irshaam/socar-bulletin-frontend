import React, { Component, useCallback} from 'react'
import SimpleReactValidator from 'simple-react-validator'
import axios from 'axios'
import Dropzone from 'react-dropzone';

class TopicForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            content: '',
            categoryId: null,
            ajaxError: 'There was a server error the prevented the form from submitting.',
            uploadStatus: false,
            files: []
        };

        this.validator = new SimpleReactValidator({
            className: 'text-danger',
        });

        this.onDrop = this.onDrop.bind(this);

    };

    componentDidMount(){
        this.setState({
            categoryId:this.props.selectedCategory.id
        })
    }

    componentWillUnmount(){
        this.reset()
    }

   

    onDrop = (acceptedFiles) =>{

        const data = new FormData();
        
        for (let i = 0; i < acceptedFiles.length; i += 1) {
            data.append('file', acceptedFiles[i]);
        }

        axios.post(`${process.env.REACT_APP_API_URL}/topics/upload`, data)
            .then((resp) => {
                var reformattedArray = resp.data.files.map(obj => {
                    var rObj = {};
                    rObj['filename'] = obj.filename;
                    return rObj;
                });

                this.setState({ files: reformattedArray})
            })
            // .then(function (response) {
            //     console.log(response)
               
            //     this.setState({
            //         files:response.data.files
            //     })
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
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
            title: '',
            content: '',
            categoryId: '',
            files:[]
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
        const { categories, selectedCategory} = this.props
        const { categoryId, files} = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <div className="control">
                        <input 
                        name="title" 
                        onChange={this.handleInputChange}  
                        value={this.state.title} 
                        className="input" 
                        type="text" 
                        placeholder="title"/>
                        {this.validator.message('title', this.state.title, 'required')}

                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <textarea 
                            onChange={this.handleInputChange}
                            value={this.state.content} 
                            className="textarea" 
                            placeholder="Content" 
                            name="content"
                        rows="5"></textarea>
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <div className="select"> 
                            <select name="categoryId" value={categoryId != null ? parseInt(categoryId) : ''} onChange={this.handleInputChange}>
                                <option>Select Category</option>
                                  

                                    {
                                        categories.length > 0 && (
                                            categories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))
                                        )
                                    }


                            </select>
                            {this.validator.message('title', this.state.categoryId, 'required')}

                        </div>
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <Dropzone onDrop={this.onDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <section className="container">
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                    <aside>
                                        <h4>Files</h4>
                                       
                                        <ul> {
                                            files.map(file => <li>{file.filename}</li>)
                                        }</ul>
                                    </aside>
                                </section>
                            )}
                        </Dropzone>

                    </div>
                </div>

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