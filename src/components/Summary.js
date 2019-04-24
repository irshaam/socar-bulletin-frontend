import React , { Component } from 'react'

class Summary extends Component {
    render(){
        const { title, value } = this.props
        return (
            <div className="topic-summary">
                <div className="topic-summary-title">{title}</div>
                <span></span>
                <div className="topic-summary-value">{value}</div>

            </div>
        )
    }
}

export default Summary