import React, { Component } from 'react'
import Category from '../../components/Category'
import Topic from '../../components/Topic'

class Home extends Component {
    componentDidMount(){
        this.props.resetCategory();
    }
    render(){
        const { categories, topics, onHandleAdd} = this.props
        return (
            <div>
            <div className="topbar">
                <button className="button is-dark" onClick={onHandleAdd}>New Topic</button>
            </div>
            <div className="container">
                
                <div className="column right" >
                    <div className="section-header">
                        <div className="section-title">
                            <h2>Category</h2>
                        </div>
                        <div className="section-meta">
                            <span>Topics</span>
                        </div>
                    </div>

                    {
                        categories.length > 0 && (
                            categories.map((category) => (
                                <Category {...category} key={`category_${category.id}`}/>
                            ))
                        )
                    }

                </div>
                <div className="column left">
                    <div className="section-header">
                        <div className="section-title">
                            <h2>Latest</h2>
                        </div>
                    </div>
                    <div className="latest-topics-wrapper">
                        {
                            topics.length > 0 && (
                                topics.map((topic) => (
                                    <Topic {...topic} key={`topic_${topic.id}`} categoryName={topic.category.name} color={topic.category.color} />
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Home