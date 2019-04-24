import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Category extends Component {
    render(){
        const { 
            color, 
            name,
            slug,
            description,
            topicCount 
        } = this.props
        return(
            <NavLink to={`/category/${slug}`}>
                <div className="category-wrapper">
                    <div className="category-content" style={{borderColor:color}}>
                        <span className="title">{name}</span>
                        <span className="excerpt">{description}</span>
                    </div>
                    <div className="category-meta">
                        <span className="topics-count">{topicCount}</span>
                    </div>
                </div>
            </NavLink>
        )
    }
}

export default Category