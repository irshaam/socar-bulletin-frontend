import React, {Component} from 'react'
import Summary from '../../components/Summary'
import Comment from '../../components/Comment'
import avatar from '../../assets/images/avatar.png'
import {ReactComponent as HeartIcon} from '../../assets/images/heart-regular.svg'
import {ReactComponent as ReplyIcon} from '../../assets/images/reply-solid.svg'
import * as moment from 'moment';

class Topic extends Component {

    componentDidMount() {
        const {idx} = this.props.match.params
        this
            .props
            .getTopic(idx)
    }

    render() {
        const { topic, onHandleAdd} = this.props
        return (
            <div>
                {Object
                    .keys(topic)
                    .length > 0 && (
                    <div className="container">
                        <div className="column-is-wide">
                            <div className="latest-topics-wrapper">
                                <div class="topic-wrapper detail">
                                    <div class="avatar-mini">
                                        <img src={avatar} alt="user avatar"/>
                                    </div>

                                    <div className="topic-content">
                                        <div className="title ">
                                            <h1>{topic.title}</h1>
                                        </div>

                                        <div className="topic-meta">
                                            <span class="category-bullet">
                                                <div
                                                    style={{
                                                    backgroundColor: topic.category.color
                                                }}></div>{topic.title}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="topic-date">
                                        <div className="day">
                                            {
                                                moment(topic.createdAt).format('DD')
                                            }

                                        </div>
                                        <div className="month">
                                            {
                                                moment(topic.createdAt).format('MMM')
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="topic-body">
                                    {topic.content}

                                    {
                                        topic.attachments.length > 0 && (
                                            <div className="images-wrapper">
                                                {
                                                    topic.attachments.map((image) => (
                                                       <div className="image"> 
                                                            <img src={`${process.env.REACT_APP_API_URL}/uploads/${image.filename}`} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                    
                                </div>

                                <div className="topic-actions">
                                    <button onClick={() => alert('heart')} className="reaction">
                                        <span>0
                                            <HeartIcon/></span>
                                    </button>
                                    <button onClick={onHandleAdd} className="comment">
                                        <span><ReplyIcon/>
                                            Comment</span>
                                    </button>
                                </div>

                                {
                                    topic.comments.map((comment) => 
                                        <Comment {...comment} />
                                    )
                                }


                            </div>

                        </div>

                        <div className="column-is-narrow">
                            {
                                topic.comments.length > 0 &&  (
                                    <Summary title="Last Comment" value={moment(topic.comments[0].createdAt).format('DD-MM-YYYY')} />
                                )
                            }
                            <Summary title="Comment" value={topic.comments.length}/>
                            <Summary title="Users" value="1"/>
                            {/* <Summary title="Views" value="1200"/> */}
                            <Summary title="Reactions" value="0"/>
                        </div>
                    </div>
                )
}
            </div>

        )
    }
}

export default Topic