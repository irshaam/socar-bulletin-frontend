
import React, { Component } from 'react'
import avatar from '../assets/images/avatar.png'
import { Link } from 'react-router-dom'

class Header extends Component{
    render() {
        return (
            <header>
                <div className="container center">
                    <div className="identity"><Link to="/"> Bulletin Board</Link></div>
                    <div className="userNav">
                        <div className="avatar">
                            <img src={avatar} alt="user avatar" />
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header