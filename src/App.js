import React from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';

class App extends React.Component{

  constructor( props ){
    super ( props );
    this.state = {
      baseURL : "http://localhost:8080/api",
      errorMessage : ""
    }
  }

  handleLogin = ( event ) => {
    event.preventDefault();

    let url = `${this.state.baseURL}/login`

    let userLogin = {
      username : event.target.username.value,
      password : event.target.password.value
    };

    let settings = {
      method : 'POST',
      body : JSON.stringify( userLogin ),
      headers : {
        'Content-Type' : 'application/json'
      }
    };

    fetch( url, settings )
      .then( response => {
        if( response.ok ){
          return response.json();
        }

        throw Error(response.statusText)
      })
      .then( responseJSON => {
        sessionStorage.setItem( 'token', responseJSON.token );
        this.props.history.push( '/Home' );
      })
      .catch( error => {
        this.setState({
          errorMessage : error.message
        });
      });
  } 

  render(){
    return (
      <div>
        <form onSubmit={(event) => this.handleLogin(event)}>
          <div>
            <label htmlFor="username">
              Username : 
            </label>
            <input type="text" name="username" />
          </div>
          <div>
            <label htmlFor="password">
              Password :
            </label>
            <input type="password" name="password" />
          </div>
          <div>
            <button type="submit">
              Login
            </button>
          </div>
        </form>
        <div>
          {this.state.errorMessage}
        </div>
      </div>
    );
  }
}

export default withRouter( App );
