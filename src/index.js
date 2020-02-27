import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import './index.css';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <Route exact path="/" component={App} />
        <Route path="/Home" component={Home}/>
    </BrowserRouter>
, document.getElementById('root'));

