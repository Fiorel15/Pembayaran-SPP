import React from 'react'

export default class KelasList extends React.Component{
    render(){
        return(
            <div className="card-col-sm-12 my-1">
                <div className="card-body row">
                    <div className="desc col-sm-8">
                       {/* Description */}
                       <h5 className="text-bold">
                            Nama Kelas: {this.props.nama_kelas}
                       </h5>
                       <h6>
                            kompetensi_keahlian: {this.props.kompetensi_keahlian}
                       </h6>
                    </div>

                    <div className="col-sm-2">
                        <button className="btn btn-sm btn-primary btn-block"
                            onClick={this.props.onEdit}  style={{borderRadius: "40%"}, {fontSize: "20px"}}>
                                <span className="fas fa-user-edit"></span>
                        </button>

                        <button className="btn btn-sm btn-block btn-danger"
                            onClick={this.props.onDrop} style={{borderRadius: "30%"}, {fontSize: "20px"}}>
                                <span className="fas fa-trash"></span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}