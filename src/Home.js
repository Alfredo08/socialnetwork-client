import React from 'react';

class Home extends React.Component{

    constructor( props ){
        super( props );
        this.state = {
            firstname : "",
            lastname : "",
            username : "",
            baseURL : "http://localhost:8080/api",
            token : ""
        }
    }

    componentDidMount(){

        let url = `${this.state.baseURL}/current-user`
        let settings = {
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${sessionStorage.getItem( 'token' )}`
            }
        };

        fetch( url, settings )
        .then( response => {
            debugger;
            if( response.ok ){
                return response.json();
            }

            throw Error(response.statusText)
        })
        .then( responseJSON => {
            this.setState({
                token : sessionStorage.getItem( 'token' ),
                firstname : responseJSON.firstname,
                lastname : responseJSON.lastname,
                username : responseJSON.username
            })
        })
        .catch( error => {
            console.log( error );
            this.props.history.push( '/' );
        });
    }

    render(){
        let welcomeBack = "";

        if( this.state.token !== "" ){
            welcomeBack = (<div>
                Welcome back {this.state.firstname} {this.state.lastname}
            </div>);
        }

        return(
            <div>
               { welcomeBack }
            </div>
        )
    }

}

export default Home;