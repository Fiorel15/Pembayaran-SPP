import React from 'react'

export default class PembayaranList extends React.Component{
    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }
    
    render(){
        return(
            <div className="container">
                <div className="card col-sm-12 my-1">
                    <div className="card-body row">
                        <div className="col-lg-4 col-sm-12">
                            <small className="text-info">ID</small>
                            <h6>{this.props.id_pembayaran}</h6>
                        </div>

                        <div className="col-lg-4 col-sm-12">
                            <small className="text-info">ID SISWA</small>
                            <h6>{this.props.id_siswa}</h6>
                        </div>

                        <div className="col-lg-4 col-sm-12">
                            <small className="text-info">ID PETUGAS</small>
                            <h6>{this.props.id_petugas}</h6>
                        </div>

                        <div className="col-lg-4 col-sm-12">
                            <small className="text-info">TANGGAL BAYAR</small>
                            <h6>{this.convertTime(this.props.tgl_bayar)}</h6>
                        </div>

                        <div className="col-lg-2 col-sm-12">
                            <small className="text-info">BULAN DIBAYAR</small>
                            <h6>{this.props.bulan_dibayar}</h6>
                        </div>

                        <div className="col-lg-2 col-sm-12">
                            <small className="text-info">TAHUN DIBAYAR</small>
                            <h6>{this.props.tahun_dibayar}</h6>
                        </div>

                        <div className="col-lg-4 col-sm-12">
                            <small className="text-info">JUMLAH BAYAR</small>
                            <h6 className="text-danger">RP {this.props.jumlah_bayar}</h6>
                        </div>

                        {/* <div className="col-lg-2 col-sm-12">
                            <button className="btn btn-sm btn-block btn-success" data-toggle="modal"
                                data-target={`#modalDetail${this.props.id_pembayaran}`}>
                                    Detail
                            </button>
                        </div> */}

                        <div className="col-lg-2 col-sm-12">
                            <button className="btn btn-sm btn-block btn-warning"
                                onClick={this.props.onInfo} >
                                    Detail
                            </button>
                        </div>

                        <div className="col-lg-2 col-sm-12">
                            <button className="btn btn-sm btn-block btn-danger"
                                onClick={this.props.onDrop} >
                                    Hapus
                            </button>
                        </div>
                    </div>
                </div>

                {/* MODAL DETAIL */}
                {/* <div className="modal fade" id={`#modalDetail${this.props.id_pembayaran}`}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5>Detail Pembayaran</h5>
                            </div>
                            <div className="modal-body">
                                <h5>Nama Siswa: {this.props.nama}</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nama Petugas</th>
                                            <th>Nama Siswa</th>
                                            <th>ID siswa</th>
                                            <th>Kelas</th>
                                            <th>ID SPP</th>
                                            <th>Tanggal Bayar</th>
                                            <th>Bulan dibayar</th>
                                            <th>Tahun dibayar</th>
                                            <th>Jumlah Nominal</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.props.transac.map(item => (
                                            <tr key={item.id_pembayaran}>
                                                <td>Nama Petugas :{item.nama_petugas}</td>
                                                <td>Nama Siswa : {item.nama}</td>
                                                <td>{item.id_siswa}</td>
                                                <td>{item.nama_kelas}</td>
                                                <td>{item.id_spp}</td>
                                                <td>{item.tgl_bayar}</td>
                                                <td>{item.bulan_dibayar}</td>
                                                <td>{item.tahun_dibayar}</td>
                                                <td>Rp {item.jumlah_bayar}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}