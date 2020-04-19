import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Manage1 from './Pages/Manage1';
import Manage2 from './Pages/Manage2';

class App extends Component {
  render(){
    let routes = (
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/manage-1' component={Manage1}/>
        <Route path='/manage-2' component={Manage2}/>
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
