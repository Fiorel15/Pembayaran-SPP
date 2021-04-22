import React from "react"
import Navbar from "../Components/Navbar"
import PembayaranList from "../Components/PembayaranList"
import $ from 'jquery'
import axios from 'axios'
import {base_url} from "../config.js"

export default class Pembayaran extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            acion: "",
            pembayaran: [],
            siswa: [],
            // id_siswa: "",
            petugas: [],
            // id_petugas: "",
            kelas: [],
            spp: [],
            // id_spp: "",
            id_pembayaran: "",
            bulan_dibayar: "",
            tahun_dibayar: "",
            jumlah_bayar: "",
            tgl_bayar: "",
            // selectedItem : null
        }

        if (localStorage.getItem("token")) {
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

    getPembayaran = () => {
        let url = base_url + "/pembayaran/admin"

        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({pembayaran: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
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
                    window.alert(err.response.data.messages)
                    this.props.history.push("/login")
                }
            } else {
                console.log(err);
            }
        })
    }

    getPetugas = () => {
        let url = base_url + "/petugas/for-admin"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({petugas: response.data.data})
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
        this.getPembayaran()
        this.getSiswa()
        this.getPetugas()
    }

    info = selectedItem => {
        $("#modal_detail").modal("show")
        this.setState({
            action: "get",
            id_pembayaran: selectedItem.id_pembayaran,
            petugas: selectedItem.petugas
        })
    }

    dropPembayaran = (item) => {
        if(window.confirm("Apakah anda yakin ingin menghapus " + item.id_pembayaran + " ?")){
            let url = base_url + "/pembayaran/admin/" + item.id_pembayaran
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPembayaran()
            })
            .catch(err => console.log(err))
        }
    }

    saveDetail = ev => {
        ev.prevenDefault()
        $("#modal_detail").modal("hide")
        
        let form = {
            id_kelas: this.state.id_kelas,
            nama_kelas: this.state.nama_kelas,
            kompetensi_keahlian: this.state.kompetensi_keahlian
        }
        
        let url = base_url + "/pembayaran/admin"
    }

    render(){
        return(
            <div>
                <Navbar />
                <h3 className="title wow bounce animated" data-wow-duration="700ms">Data Pembayaran</h3>
                <div className="container">
                    {this.state.pembayaran.map(item => (
                        <PembayaranList
                            key = {item.id_pembayaran}
                            id_pembayaran = {item.id_pembayaran}
                            id_petugas = {item.id_petugas}
                            id_siswa = {item.id_siswa}
                            tgl_bayar = {item.tgl_bayar}
                            bulan_dibayar = {item.bulan_dibayar}
                            tahun_dibayar = {item.tahun_dibayar}
                            jumlah_bayar= {item.jumlah_bayar}
                            onInfo = {() => this.info(item)}
                            onDrop = {() => this.dropPembayaran(item)}
                        />
                    ))}

                    {/* <select className="form-control"
                        value={this.state.id_siswa} readOnly>
                            {this.state.siswa.map(item => (
                                <option value={item.id_siswa}>
                                      {item.nama}
                                </option>
                            ))}
                    </select> */}
                </div>
                
                {/* MODAL DETAIL */}
                <div className="modal fade" id="modal_detail">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h4>Detail Pembayaran</h4>
                            </div>

                            <div className="modal-body">
                                <form >
                                    ID
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.id_pembayaran}
                                        readOnly
                                    />

                                    Nama Petugas
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.id_petugas}
                                        readOnly
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
