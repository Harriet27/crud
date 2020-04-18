import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import ManageProduct from './Pages/ManageProduct';

class App extends Component {
  render(){
    let routes = (
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/manage-products' component={ManageProduct} exact />
      </Switch>
    );
    return(
      <div>
        {routes}
      </div>
    )
  }
}

export default App;
