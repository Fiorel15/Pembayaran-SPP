import React from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import PetugasList from "../Components/PetugasList"
import {base_url, admin_image_url} from "../config.js"
import $ from "jquery"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            petugas: [],
            token: "",
            action: "",
            id_petugas: "",
            username: "",
            password: "",
            nama_petugas: "",
            level: "",
            image: "",
            uploadFile: true,
            fillPassword: true
        }

        if(localStorage.getItem("token")){
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getPetugas = () => {
        let url = base_url + "/petugas/for-admin"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({petugas: response.data})
        })
        .catch(err => {
            if(err.response){
                if(err.response.status){
                    window.alert(err.response.data.messages)
                    this.props.history.push("/login")
                }
            } else {
                console.log(err);
            }
        })
    }

    componentDidMount(){
        this.getPetugas()
    }

    Add = () => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "insert",
            id_petugas: 0,
            nama_petugas: "",
            level: "",
            username: "",
            password: "",
            image: null,
            fillPassword: true,
            uploadFile: true
        })
    }

    Edit = SelectedItem => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "update",
            id_petugas: SelectedItem.id_petugas,
            nama_petugas: SelectedItem.nama_petugas,
            level: SelectedItem.level,
            username: SelectedItem.username,
            password: SelectedItem.password,
            image: null,
            fillPassword: false,
            uploadFile: false
        })
    }

    SavePetugas = ev => {
        ev.preventDefault()
        $("#modal_petugas").modal("hide")
        let form = new FormData()
        form.append("id_petugas", this.state.id_petugas)
        form.append("nama_petugas", this.state.nama_petugas)
        form.append("level", this.state.level)
        form.append("username", this.state.username)
       if(this.state.uploadFile){
           form.append("image", this.state.image)
       }
       if(this.state.fillPassword){
           form.append("password", this.state.password)
       }

       let url = base_url + "/petugas/for-admin"
       if(this.state.action === "insert") {
           axios.post(url, form, this.headerConfig())
           .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
       } else if (this.state.action === "update"){
           axios.put(url, form, this.headerConfig())
           .then(response => {
               window.alert(response.data.message)
               this.getPetugas()
           })
           .catch(err => console.log(err))
       }
    }

    dropPetugas = (item) => {
        if(window.confirm("Apakah anda yakin ingin menghapus " + item.nama_petugas + " ?")){
            let url = base_url + "/petugas/for-admin/" + item.id_petugas
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(err => console.log(err))
        }
    }

    render(){
        return(
            <div>
                <Navbar />
                <h3 className="title wow bounce animated" data-wow-duration="700ms">Petugas List</h3>
                <div className="container">
                    <div className="row">
                        { this.state.petugas.map(item => (
                            <PetugasList
                                key = {item.id_petugas}
                                nama_petugas = {item.nama_petugas}
                                username = {item.username}
                                pasword = {item.password}
                                level = {item.level}
                                image = {admin_image_url + "/" + item.image}
                                onEdit = {() => this.Edit(item)}
                                onDrop = {() => this.dropPetugas(item)}
                            />
                        ))}
                    </div>

                    <button className="btn btn-success" style={{borderRadius:"50%"}, {fontSize: "20px"}}
                         onClick={() => this.Add()}>
                           <span className="fa fa-plus"></span>
                    </button>
                </div>

                {/* MODAL PETUGAS */}
                <div className="modal fade" id="modal_petugas">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4>Form Petugas</h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.SavePetugas(ev)}>
                                    Nama Petugas
                                    <input type ="text" className="form-control mb-1"
                                        value={this.state.nama_petugas}
                                        onChange={ev => this.setState({nama_petugas: ev.target.value})}
                                        required
                                    />

                                    Level 
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.level}
                                        onChange={ev => this.setState({level: ev.target.value})}
                                        required
                                    />

                                    Username
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.username}
                                        onChange={ev => this.setState({username: ev.target.value})}
                                        required
                                    />

                                    { this.state.action === "update" && this.state.fillPassword === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                            onClick={() => this.setState({fillPassword: true})}>
                                                Ubah Password
                                        </button>
                                    ) : (
                                        <div>
                                            Password
                                            <input type="password" className="form-control mb-1"
                                                value={this.state.password}
                                                onChange={ev => this.setState({password: ev.target.value})}
                                                required
                                            />
                                        </div>
                                    )
                                    }

                                    { this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-block btn-info mb-1"
                                            onClick={() => this.setState({uploadFile: true})}>
                                                Ubah Foto Petugas
                                        </button>
                                    )  : (
                                        <div>
                                            Foto Siswa
                                            <input type="file" className="form-control mb-1"
                                                onChange={ev => this.setState({image: ev.target.files[0]})}
                                                required
                                            />
                                        </div>
                                    )
                                    }

                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}