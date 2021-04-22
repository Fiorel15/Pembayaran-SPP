import React from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import {base_url} from "../config.js"
import SppList from "../Components/SppList"
import $ from 'jquery'

export default class Spp extends React.Component{
    constructor(){
        super()
        this.state = {
            spp: [],
            action: "",
            token: "",
            id_spp: "",
            tahun: 0,
            nominal: 0
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

    componentDidMount(){
        this.getSpp()
    }

    Add = () => {
        $("#modal_spp").modal("show")
        this.setState({
            action: "insert",
            id_spp: 0,
            tahun: 0,
            nominal: 0
        })
    }

    Edit = selectedItem => {
        $("#modal_spp").modal("show")
        this.setState({
            action: "update",
            id_spp: selectedItem.id_spp,
            tahun: selectedItem.tahun,
            nominal: selectedItem.nominal
        })
    }

    saveSpp = ev => {
        ev.preventDefault()
        $("#modal_spp").modal("hide")
        // let form = new FormData()
        // form.append("id_spp", this.state.id_spp)
        // form.append("tahun", this.state.tahun)
        // form.append("nominal", this.state.nominal)

        let form = {
            id_spp: this.state.id_spp,
            tahun: this.state.tahun,
            nominal: this.state.nominal
        }

        let url = base_url + "/spp"
        if(this.state.action === "insert"){
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(err => console.log(err))
        } else if(this.state.action === "update"){
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(err => console.log(err))
        }
    }

    dropSpp = (item) => {
        if(window.confirm("Apakah anda yakin akan menghapus data " + item.tahun + " ?")){
            let url = base_url + "/spp/" + item.id_spp
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(err => console.log(err))
        }

    }

    render(){
        return(
            <div>
                <Navbar />
                <h3 className="title wow bounce animated" data-wow-duration="700ms">Daftar SPP</h3>
                <div className="container">
                    <div className="row">
                        {this.state.spp.map(item => (
                            <SppList
                                key = {item.id_spp}
                                id_spp = {item.id_spp}
                                tahun = {item.tahun}
                                nominal = {item.nominal}
                                onEdit = {() => this.Edit(item)}
                                onDrop = {() => this.dropSpp(item)}
                            />
                        ))}
                    </div>

                    <button className="btn btn-success" style={{borderRadius:"50%"}, {fontSize: "20px"}}
                         onClick={() => this.Add()}>
                           <span className="fa fa-plus"></span>
                    </button>
                </div>

                {/* MODAL SPP */}
                <div className="modal fade" id="modal_spp">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-warning text-white">
                                Form SPP
                            </div>
                            
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveSpp(ev)}>
                                    Nominal 
                                    <input type="number" className="form-control mb-1"
                                        value={this.state.nominal}
                                        onChange={ev => this.setState({nominal: ev.target.value})}
                                        required
                                    />

                                    Tahun
                                    <input type="number" className="form-control mb-1"
                                        value={this.state.tahun}
                                        onChange={ev => this.setState({tahun: ev.target.value})}
                                        required
                                    />

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