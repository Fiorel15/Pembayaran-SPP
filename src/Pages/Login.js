import React from "react";
import axios from "axios";
import { base_url } from '../config.js';

class Home extends React.Component{
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
        }
    }

    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password,
            level: "admin"
        }

        let url = base_url + "/petugas/auth"

        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                let petugas = response.data.data
                let token = response.data.token
                // let level = response.data.data.level
                if(petugas.level === "admin"){
                    localStorage.setItem("admin", JSON.stringify(petugas))
                    localStorage.setItem("token", token)
                    this.props.history.push("/")
                } else {
                    localStorage.setItem("petugas", JSON.stringify(petugas))
                    localStorage.setItem("token", token)
                    this.props.history.push("/")
                }
            } 
             else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="cont">
                <div className="body">
                    <section>
                    <div className="color"></div>
                    <div className="color"></div>
                    <div className="color"></div>
                    <div className="box">
                        <div className="square"></div>
                        <div className="square"></div>
                        <div className="square"></div>
                        <div className="square"></div>
                        <div className="square"></div>
                        <div className="square"></div>
                        <div className="container">
                            <div className="form">
                                <h2>Admin Sign In</h2>
                                { !this.state.logged ? 
                                    (
                                        <div className="alert alert-danger mt-1">
                                            { this.state.message }
                                        </div>
                                    ) : null 
                                }
                                <form onSubmit={ev => this.Login(ev)}>
                                    <div className="inputBox">
                                        <input type="text" placeholder="Username"
                                            value={this.state.username}
                                            onChange={ev => this.setState({username: ev.target.value})}></input>
                                    </div>
                                    <div className="inputBox">
                                        <input type="password" placeholder="Password"
                                            value={this.state.password}
                                            onChange={ev => this.setState({password: ev.target.value})}></input>
                                    </div>
                                    <div className="inputBox">
                                        <input type="submit" value="Login"></input>
                                        {/* <button type="submit">Login</button> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Home;
