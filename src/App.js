import React from "react"
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Petugas from "./Pages/Petugas"
import Kelas from "./Pages/Kelas"
import Spp from "./Pages/Spp"
import Siswa from "./Pages/Siswa"
import Transaksi from "./Pages/Pembayaran"

export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/petugas/for-admin" component={Petugas} />
        <Route path="/kelas" component={Kelas} />
        <Route path="/spp" component={Spp} />
        <Route path="/siswa/for-admin" component={Siswa} />
        <Route path="/pembayaran/admin" component={Transaksi} />
      </Switch>
    )
  }
}