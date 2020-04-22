import React, { Component } from 'react';

class child extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
               {this.props.name}
            </div>
        );
    }
}

export default child;