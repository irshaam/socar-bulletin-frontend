import React, { Component } from 'react'
import './assets/scss/app.scss'
import Header from './components/Header'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from './views/Home'
import { Category } from './views/Category'
import {Topic } from './views/Topic'
import * as Blitz from './utils/Api'
import Modal from 'react-modal';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { TopicForm , CommentForm} from './components/Forms'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding:0,
    }
};

Modal.setAppElement('#root')

class App extends Component { 
    constructor(props) {
      super(props)
        this.state = {
            categories:[],
            topics:[],
            filteredTopics:[],
            selectedCategory:{},
            topicFormModal: false,
            commentModal: false,
            selectedTopic:{}
        }

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.init()
    }

    init = () => {
        this.getCategories()
        this.getTopics()
    }

    getCategory = (slug) => {
        Blitz.getCategory(slug).then((resp) => this.setState({ selectedCategory: resp.data }))
    }

    getCategories = () => {
        Blitz.getCategories().then((resp) => this.setState({categories:resp.data}))
    }

    getTopics = () => {
        Blitz.getTopics().then((resp) => this.setState({ topics: resp.data }))
    }

    getTopic = (idx) => {
        Blitz.getTopic(idx).then((resp) => this.setState({ selectedTopic: resp.data }))
    }
   
    openModal(modal) {
        this.setState({ [modal]: true });
    }

    closeModal(modal) {
        this.setState({ [modal]: false });
    }

    afterOpenModal() {}

    resetSelected = () => {
        this.setState({
            selectedCategory:{}
        })
    }

    addTopic = (formData) => {
        Blitz.addTopic(formData).then((resp) => {
            this.setState((prevState) => ({
                topics: [resp.data, ...prevState.topics],
                categories: prevState.categories.map(category => category.id === resp.data.categoryId ? Object.assign({}, category, { topicCount: category.topicCount + 1 }) : category),
                selectedCategory: prevState.selectedCategory.id === resp.data.categoryId ? Object.assign({}, prevState.selectedCategory, { topics: [resp.data, ...prevState.selectedCategory.topics]}) : prevState.selectedCategory
            }))
        }, this.notifySuccess('topicFormModal', 'Topic Added Successfully'))

    }

    addComment = (formData) => {
        Blitz.addComment(formData).then((resp) => {
            this.setState((prevState) => ({
                // topics: [resp.data, ...prevState.topics],
                topics: prevState.topics.map(topic => topic.id === resp.data.topicId ? Object.assign({}, topic, { commentCount: topic.commentCount + 1 }) : topic),
                selectedTopic: prevState.selectedTopic.id === resp.data.topicId ? Object.assign({}, prevState.selectedTopic, { comments: [resp.data, ...prevState.selectedTopic.comments]}) : prevState.selectedTopic
            }))
        }, this.notifySuccess('commentModal', 'Comment Added Successfully') )

    }

    notifySuccess = (modal, msg) => {
        this.closeModal(modal)
        ToastsStore.success(msg)
    }

    
    render(){
        const { 
            categories, 
            topics, 
            selectedCategory, 
            filteredTopics,
            selectedTopic
        } = this.state
        return (
            <Router>
                    
                    <Header />
                    <main>
                        <Route 
                            path="/" 
                            exact 
                            render={(routeProps) => (
                                <Home {...routeProps} categories={categories} topics={topics} onHandleAdd={() => this.openModal('topicFormModal')} resetCategory={this.resetSelected}/>
                            )} 
                        />

                        <Route 
                            path="/category/:idx" 
                            render={(routeProps) => (
                                <Category {...routeProps} 
                                    category={selectedCategory} 
                                    getCategory={this.getCategory} 
                                    getTopicsByCategory={this.getTopicsByCategory} 
                                    topics={filteredTopics}
                                    onHandleAdd={() => this.openModal('topicFormModal')}
                                />
                            )} 
                         />

                        <Route 
                            path="/topic/:idx" 
                            render={(routeProps) => (
                                <Topic 
                                    {...routeProps} 
                                    topic={selectedTopic} 
                                    getTopic={this.getTopic} 
                                    onHandleAdd={() => this.openModal('commentModal')}
                                />
                            )} 
                         />
                         
                    </main>

                    <footer>Very simple bulletin board for Socar Test Application - 2019</footer>


                    
                    <Modal
                        isOpen={this.state.topicFormModal}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={() => this.closeModal('topicFormModal')}
                        style={customStyles}
                        contentLabel="Add New Topic"
                    >                
                    
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title" ref={subtitle => this.subtitle = subtitle}>New Topic</p>
                            <button onClick={() => this.closeModal('topicFormModal')} className="delete" aria-label="close"></button>
                            </header>

                            <section className="modal-card-body">
                                <TopicForm categories={categories} onHandleSubmit={this.addTopic} selectedCategory={selectedCategory} />
                            </section>

                        </div>
                    </Modal>

                {/* Comment Form */}
                <Modal
                    isOpen={this.state.commentModal}
                    onRequestClose={() => this.closeModal('commentModal')}
                    style={customStyles}
                    contentLabel="New Comment"
                >

                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title" ref={subtitle => this.subtitle = subtitle}>New Comment</p>
                            <button onClick={() => this.closeModal('commentModal')} className="delete" aria-label="close"></button>
                        </header>

                        <section className="modal-card-body">
                            <CommentForm  onHandleSubmit={this.addComment} selectedTopic={selectedTopic} />
                        </section>

                    </div>
                </Modal>

                <ToastsContainer store={ToastsStore} />

            </Router>
        )
    }
}

export default App;