import axios from 'axios'
import React from 'react'
import Navbar from '../Components/Navbar'
import SiswaList from "../Components/SiswaList"
import {base_url, siswa_image_url} from "../config.js"
import $ from "jquery";

export default class Siswa extends React.Component{
    constructor(){
        super()
        this.state = {
            siswa : [],
            kelas: [],
            spp: [],
            id_siswa:"",
            token: "",
            action: "",
            nis: "",
            nama: "",
            no_telp: "",
            alamat: "",
            id_kelas: "",
            id_spp: "",
            username: "",
            password: "",
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

    getSiswa = () => {
        let url = base_url + "/siswa/for-admin"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({siswa: response.data})
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

    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({spp: response.data.data})
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

    componentDidMount() {
        this.getSiswa()
        this.getKelas()
        this.getSpp()
    }

    Add = () => {
        $("#modal_siswa").modal("show")
        this.setState({
            action: "insert",
            id_siswa: 0,
            nis: "",
            nama: "",
            no_telp: "",
            alamat: "",
            // nama_kelas: "",
            id_kelas: "",
            id_spp: "",
            username: "",
            password: "",
            image: null,
            fillPassword: true,
            uploadFile: true
        })
    }

    Edit = selectedItem => {
        $("#modal_siswa").modal("show")
        this.setState({
            action: "update",
            id_siswa: selectedItem.id_siswa,
            nis: selectedItem.nis,
            nama: selectedItem.nama,
            id_kelas: selectedItem.id_kelas,
            no_telp: selectedItem.no_telp,
            alamat: selectedItem.alamat,
            // id_kelas: selectedItem.id_kelas,
            id_spp: selectedItem.id_spp,
            username: selectedItem.username,
            password: selectedItem.password,
            image: null,
            fillPassword: false,
            uploadFile: false
        })
    }

    SaveSiswa = ev => {
        ev.preventDefault()
        $("#modal_siswa").modal("hide")
        let form = new FormData()
        form.append("id_siswa", this.state.id_siswa)
        form.append("nis", this.state.nis)
        form.append("nama", this.state.nama)
        form.append("id_kelas", this.state.id_kelas)
        form.append("id_spp", this.state.id_spp)
        form.append("no_telp", this.state.no_telp)
        form.append("alamat", this.state.alamat)
        form.append("username", this.state.username)
        if(this.state.uploadFile) {
            form.append("image", this.state.image)
        }
        if(this.state.fillPassword) {
            form.append("password", this.state.password)
        }
        
        let url = base_url + "/siswa/for-admin"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        }
    }

    dropSiswa = (item) => {
        if(window.confirm("Apakah anda yakin ingin menghapus " + item.nama + " ?")){
            let url = base_url + "/siswa/for-admin/" + item.id_siswa
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
                <h3 className="title wow bounce animated" data-wow-duration="700ms">Daftar Siswa</h3>
                <div className="container">
                    <div className="row">
                        { this.state.siswa.map( item => (
                            <SiswaList
                                key = {item.id_siswa}
                                nis = {item.nis}
                                nama = {item.nama}
                                username= {item.username}
                                password = {item.password}
                                no_telp = {item.no_telp}
                                alamat = {item.alamat}
                                id_kelas = {item.id_kelas}
                                id_spp = {item.id_spp}
                                image = { siswa_image_url + "/" + item.image }
                                onEdit = {() => this.Edit(item)}
                                onDrop = {() => this.dropSiswa(item)}
                            />
                        )) }
                    </div>

                    <button className="btn btn-success" style={{borderRadius:"50%"}, {fontSize: "20px"}}
                         onClick={() => this.Add()}>
                           <span className="fa fa-plus"></span>
                    </button>
                </div>

                {/* MODAL SISWA */}
                <div className="modal fade" id="modal_siswa">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-warning text-black">
                                <h4>Form Siswa</h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.SaveSiswa(ev)} >
                                    Nama Siswa
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({nama: ev.target.value})}
                                        required
                                    />

                                    NIS
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nis}
                                        onChange={ev => this.setState({nis: ev.target.value})}
                                        required
                                    />

                                    Username
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.username}
                                        onChange={ev => this.setState({username: ev.target.value})}
                                        required
                                    />                  

                                    Kelas 
                                    <select className="form-control mb-1"
                                        onChange={ev => this.setState({id_kelas: ev.target.value})}
                                        value={this.state.id_kelas}>
                                            {
                                                this.state.kelas.map(item => (
                                                    <option key ={item.id_kelas} value={item.id_kelas}>
                                                        {item.nama_kelas}
                                                    </option>
                                                ))
                                            }
                                    </select>

                                    Alamat Siswa
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.alamat}
                                        onChange={ev => this.setState({alamat: ev.target.value})}
                                        required
                                    />
                                    Nomor Telepon Siswa
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.no_telp}
                                        onChange={ev => this.setState({no_telp: ev.target.value})}
                                        required
                                    />
                                    SPP
                                    <select className="form-control"
                                    onChange={ev =>this.setState({id_spp: ev.target.value})}
                                        value={this.state.id_spp}>
                                            {
                                                this.state.spp.map(item => (
                                                    <option key={item.id_spp} value={item.id_spp}>
                                                        {item.nominal}
                                                    </option>
                                                ))
                                            }
                                    </select>
                                    { this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                            onClick={() => this.setState({uploadFile: true})}>
                                                Ubah Foto Siswa
                                        </button>
                                    ) : (
                                        <div>
                                            Foto Siswa
                                            <input type="file" className="form-control mb-1"
                                                onChange={ev => this.setState({image: ev.target.files[0]})}
                                                required 
                                            />
                                        </div>
                                    ) }

                                    { this.state.action === "update" && this.state.fillPassword === false ? (
                                        <button className="btn btn-sm btn-secondary mb-1 btn-block"
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
                                    ) }

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