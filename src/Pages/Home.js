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
                        Click <a href='/manage-1'>Here</a> to go to manage page With Redux.
                        <br/>
                        Click <a href='/manage-2'>Here</a> to go to manage page Without Redux.
                        <br/>
                        Click <a href='/manage-3'>Here</a> to go to manage page using Hooks.
                    </p>
                </header>
            </div>
        )
    }
}

export default Home;