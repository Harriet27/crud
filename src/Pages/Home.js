import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class Home extends Component {
    render(){
        return(
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='Logo'/>
                    <h1 className='App-title'>
                        Welcome to React
                    </h1>
                    <p className='App-intro'>
                        Click <a href='/manage-products'>Here</a> to get started.
                    </p>
                </header>
            </div>
        )
    }
}

export default Home;