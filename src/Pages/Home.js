import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { base_url } from '../config.js'

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token : "",
            namaPetugas: null,
            siswaCount: 0,
            admninCount: 0,
            pembayaranCount: 0,
            kelasCount: 0,
            sppCount: 0
        }

        if(localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }

    getPembayaran = () => {
        let url = base_url + "/pembayaran/admin"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({pembayaranCount: response.data.length})
        })
        .catch(err => {
            if(err.response){
                if(err.response.status){
                    window.alert(err.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(err);
            }
        })
    }
    
    getSiswa = () => {
        let url = base_url + "/siswa/for-admin"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({siswaCount: response.data.length})
        })
        .catch(err => {
            if(err.response){
                if(err.response.status){
                    window.alert(err.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(err);
            }
        })
    }

    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({kelasCount: response.data.data.length})
        })
        .catch(err => {
            if(err.response){
                if(err.response.status){
                    window.alert(err.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(err);
            }
        })
    }

    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({sppCount: response.data.data.length})
        })
        .catch(err => {
            if(err.response){
                if(err.response.status){
                    window.alert(err.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(err);
            }
        })
    }
    
    getAdmin = () => {
        let url = base_url + "/petugas/for-admin"
        axios.get (url, this.headerConfig())
        .then(response => {
            this.setState({adminCount: response.data.length})
        })
        .catch(err => {
            if(err.response){
                if(err.response.status){
                    window.alert(err.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(err);
            }
        })
    }

    getAdmins = () => {
        let admin = JSON.parse(localStorage.getItem("admin"))
        this.setState({namaPetugas: admin.nama_petugas})
    }

    componentDidMount(){
        this.getSiswa()
        this.getKelas()
        this.getPembayaran()
        this.getSpp()
        this.getAdmin()
        this.getAdmins()
    }

    render(){
        return(
            <div className="body">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h3 className="brand">
                            {/* <span className="ti-unlink"></span> */}
                            <span> ~ Moklet ~ <br/> Administration</span>
                        </h3>
                        <label className="ti-menu-alt"></label>
                    </div>

                    <div className="sidebar-menu">
                        <ul>
                            <li>
                                <span>
                                    <Link to="/" value="/">Home</Link>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <Link to="/siswa/for-admin" value="/siswa/for-admin">Siswa</Link>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <Link to="/petugas/for-admin" value="/petugas/for-admin">Petugas</Link>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <Link to="/kelas" value="/kelas">Kelas</Link>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <Link to="/spp" value="/spp">SPP</Link>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <Link to="/pembayaran/admin" value="/pembayaran/admin">Transaksi</Link>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <Link onClick={() => this.Logout()}>Logout</Link>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="main-content">
                    <header>
                        <div className="search-wrapper">
                            <input type="search" placeholder="search"></input>
                        </div>              
                    </header>

                    <main>
                        <h4 className="judul my-2">
                            <strong> Welcome Back, {this.state.namaPetugas} </strong>
                        </h4>
                        <br />
                        <div className="dash-cards">
                            <div className="card-single">
                                <div className="card-body">
                                    <span className="ti-briefcase"></span>
                                    <div>
                                        <h5>Data Pembayaran</h5>
                                        <strong>{this.state.pembayaranCount}</strong>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <Link to="/pembayaran/admin">View all</Link>
                                </div>
                            </div>

                            <div className="card-single">
                                <div className="card-body">
                                    <span className="ti-briefcase"></span>
                                    <div>
                                        <h5>Data SPP</h5>
                                        <strong>{this.state.sppCount}</strong>
                                                {/* ini data ambil di db */}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <Link to="/spp">View all</Link>
                                </div>
                            </div>

                            <div className="card-single">
                                <div className="card-body">
                                    <span className="ti-briefcase"></span>
                                    <div>
                                        <h5>Data Kelas</h5>
                                        <strong>{this.state.kelasCount}</strong>
                                                {/* ini data ambil di db */}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <Link to="/kelas">View all</Link>
                                </div>
                            </div>

                            <div className="card-single">
                                <div className="card-body">
                                    <span className="ti-briefcase"></span>
                                    <div>
                                        <h5>Data Siswa</h5>
                                        <strong>{this.state.siswaCount}</strong>
                                                {/* ini data ambil di db */}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <Link to="/siswa/for-admin" value="/siswa/for-admin">View all</Link>
                                </div>
                            </div>

                            <div className="card-single">
                                <div className="card-body">
                                    <span className="ti-briefcase"></span>
                                    <div>
                                        <h5>Data Petugas</h5>
                                        <strong>{this.state.adminCount}</strong>
                                                {/* ini data ambil di db */}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <Link to="/petugas/for-admin">View all</Link>
                                </div>
                            </div>
                        </div>
                            <section>
                            </section>
                        </main>
                </div>
            </div>
        )
    }
}