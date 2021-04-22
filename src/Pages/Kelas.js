import React from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import $ from 'jquery'
import KelasList from "../Components/KelasList"
import {base_url} from "../config.js"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {  
            kelas: [],
            token: "",
            action: "",
            id_kelas: "",
            nama_kelas: "",
            kompetensi_keahlian: ""
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

    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({kelas: response.data.data})
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

    componentDidMount(){
        this.getKelas()
    }

    Add = () => {
        $("#modal_kelas").modal("show")
        this.setState({
            action: "insert",
            id_kelas: 0,
            nama_kelas: "",
            kompetensi_keahlian: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_kelas").modal("show")
        this.setState({
            action: "update",
            id_kelas: selectedItem.id_kelas,
            nama_kelas: selectedItem.nama_kelas,
            kompetensi_keahlian: selectedItem.kompetensi_keahlian
        })
    }

    saveKelas = ev => {
        ev.prevenDefault()
        $("#modal_kelas").modal("hide")
        
        let data = {
            id_kelas: this.state.id_kelas,
            nama_kelas: this.state.nama_kelas,
            kompetensi_keahlian: this.state.kompetensi_keahlian
        }
        
        let url = base_url + "/kelas"
        if(this.state.action === "insert"){
            axios.post(url, data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getKelas()
            })
            .catch(err => console.log(err))
        } else if(this.state.action === "update"){
            axios.put(url, data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getKelas()
            })
            .catch(err => console.log(err))
        }
    }

    dropKelas = (item) => {
        if(window.confirm("Apakah anda yakin ingin menghapus " + item.nama_kelas + " ?")){
            let url = base_url + "/kelas/" + item.id_kelas
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getKelas()
            })
            .catch(err => console.log(err))
        }
    }

    render(){
        return(
            <div>
                <Navbar />
                <h3 className="title wow bounce animated" data-wow-duration="700ms">Daftar Kelas</h3>
                <div className="container">
                    <div className="row">
                        {this.state.kelas.map(item => (
                            <KelasList
                                key = {item.id_kelas}
                                nama_kelas = {item.nama_kelas}
                                kompetensi_keahlian = {item.kompetensi_keahlian}
                                onEdit = {() => this.Edit(item)}
                                onDrop = {() => this.dropKelas(item)}
                            />
                        ))}
                    </div>

                    <button className="btn btn-success" style={{borderRadius:"50%"}, {fontSize: "20px"}} 
                        onClick={() => this.Add()}>
                           <span className="fa fa-plus"></span>
                    </button>
                </div>

                {/* MODAL KELAS */}
                <div className="modal fade" id="modal_kelas">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h4>Form Kelas</h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.saveKelas(ev)}>
                                    Nama Kelas
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nama_kelas}
                                        onChange={ev => this.setState({nama_kelas: ev.target.value})}
                                        required
                                    />

                                    Kompetensi Keahlian
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.kompetensi_keahlian}
                                        onChange={ev => this.setState({kompetensi_keahlian: ev.target.value})}
                                        required
                                    />

                                    <button type="submit" className="btn btn-success btn-block"> 
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