import React, { Component } from 'react'
import avatar from '../assets/images/avatar.png'
import * as moment from 'moment';


class Comment extends Component {
    render(){
        const { content, createdAt } = this.props
        return (
            <div className="comment-wrapper">
                <div className="comment-header">
                    <div className="avatar-mini">
                        <img src={avatar} alt="user avatar" />
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

                <div className="comment-body">
                    {content}
                </div>

            </div>
        )
    }
}

export default Comment