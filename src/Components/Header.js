import React, { Component } from "react";
import axios from "axios";

class Header extends Component {
    constructor() {
    super();
    this.state = {
        user: {},
        username: "",
        password: ""
    };
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    }

    handleUsernameInput(value) {
    this.setState( { 
        username: value
    });
    }
    handlePasswordInput(value) {
        this.setState( {
            password: value
        });
    }
    updateUser(user) {
        this.setState( {
            user
        });
    }
    register() {
        const { username, password } = this.state;
        axios
        .post('api/auth/register', {username, password})
        .then(user => {
            this.setState( {
            username: '',
            password: ''
            });
            this.updateUser(user.data);
        })
        .catch(err => {
            this.setState( {
            username: '',
            password: ''
            });
            alert(err.response.request.response)
        });
    }
    login() {
    const { username, password } = this.state;
    axios
    .post("api/auth/login", {username, password})
    .then(user => {
        this.updateUser(user.data);
        this.props.setSessionData(user.data);
    }) 
    .catch(err => alert(err.response.request.response));
    }
    logout() {
    axios
    .post("api/auth/logout")
    .then(() => {
        this.updateUser({});
    })
    .catch(err => console.log(err));
    }

    render() {
    const { user, username, password } = this.state;
        return (
            <div>
                <div>
                    <input type="text" placeholder="Enter username" value={username} onChange={e => handleUsernameInputFn(e.target.value)}></input>
                </div>
                <div>
                    <input type="password" placeholder="Enter password" value={password} onChange={e => handlePasswordInputFn(e.target.value)}></input>
                </div>
                <div>
                    <button onClick={login}>
                        Login
                    </button>
                </div>
            </div>
        );
    }
}
export default Header;