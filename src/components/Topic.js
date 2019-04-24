import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/images/avatar.png'
import { ReactComponent as Comment} from '../assets/images/comment-solid.svg'
import * as moment from 'moment';

class Topic extends Component {
    render(){
        const { id, title, createdAt, commentCount, categoryName, color } = this.props
        return (
            <Link to={`/topic/${id}`}>

                <div className="topic-wrapper">
                    <div className="avatar-mini">
                        <img src={avatar} alt="user avatar"/>
                    </div>
                    
                    <div className="topic-content">
                        <div className="title">
                            <span>{title}</span>
                        </div>

                        <div className="topic-meta">
                            <span className="category-bullet">
                                <div style={{ backgroundColor: color }}></div>{categoryName}
                            </span>
                            <span className="comment-count">
                                <Comment />{commentCount}  
                            </span>
                        </div>
                    </div>

                    <div className="topic-date">
                        <div className="day">
                            {
                                moment(createdAt).format('DD')
                            }
                            
                        </div>
                        <div className="month">
                            {
                                moment(createdAt).format('MMM')
                            }
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default Topic