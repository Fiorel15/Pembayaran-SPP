import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }

    render(){
        return(
            <div>
                <nav className="nav">
                    <div className="logo">
                        <div className="logo-icon">
                            <span>Pembayaran SPP MOKLET</span>
                        </div>
                    </div>

                    {/* show and hide menu */}
                    <button className="navbar-toggler" data-toggle="collapse"
                    data-target="#menu">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="show white">
                        <ul className="nav-list">
                            <div>
                                <li className="nav-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/siswa/for-admin">Siswa</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/petugas/for-admin">Petugas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/kelas">Kelas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/spp">SPP</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/pembayaran/admin">Transaksi</Link>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={() => this.Logout()}>Logout</Link>
                                </li>
                            </div>
                            <span className="hide black">x</span>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;
