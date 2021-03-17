import React, { Component } from "react";
import AuthService from '../../services/auth.service';

import './confirm.css';

const confirm = AuthService.confirm;
const parameters = new URLSearchParams(window.location.search);
const id = parameters.get('userId');

class Confirm extends Component {

    constructor(props){
        super(props)
        this.state = {
            message: "Please wait while we verify your email",
            post: true
        }
        this.redirectTimeout = null;
    }


    render() {

        if(this.state.post){
            confirm(id).then(response => {
                this.setState({post: false});
                this.setState({message: `${response.msg}`}, () => {
                    const { history } = this.props;
                    this.redirectTimeout = setTimeout(() => {
                        history.push('/login')
                    }, 5000);
                })
            })
        }

        return (
            <div className="container">
                <h1>{this.state.message}</h1>
                <a href={"/login"}>Click here to login.</a>
            </div>
            );
    }

};

export default Confirm;