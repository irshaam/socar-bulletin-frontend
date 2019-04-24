import React, { Component } from 'react'
import Topic from '../../components/Topic'


class Category extends Component {

    componentDidMount(){
        const { idx } = this.props.match.params
        this.props.getCategory(idx)
    }

    handleAdd = () => {
        this.props.onHandleAdd()
    }
   

    render() {
        const { category, onHandleAdd  } = this.props
        const { topics } = this.props.category
      

        return (
            <div>
                <div className="topbar">
                    <button className="button is-dark" onClick={this.handleAdd}>New Topic</button>
                </div>
                <div className="container">
                    <div className="column">
                        <div className="section-header">
                            <div className="section-title">
                                {
                                    category && (
                                        <h2>Category : {category.name}</h2>
                                    )
                                }
                                
                            </div>
                        </div>
                        <div className="latest-topics-wrapper">
                            { 
                                topics && (
                                    topics.length >  0  && (
                                        topics.map((topic) => <Topic key={`cat_topic_${topic.id}`} {...topic} color={category.color} categoryName={category.name} />)
                                    )
                                )
                            }
                            

                            {
                                 topics && (
                                    topics.length === 0 && (
                                    <div className="empty">
                                            0 Topics found...
                                        </div>

                                    )
                                )
                            }

                        </div>
                    </div>
                </div>

                {/* <CategoryModal category={category} onHandleSubmit={this.addTopic} /> */}
            </div>
        )
    }
}

export default Category