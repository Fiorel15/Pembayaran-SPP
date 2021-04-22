import React from 'react'

export default class SppList extends React.Component{
    render(){
        return(
            <div className="card-col-sm-12 my-4">
                <div className="card-body row">
                    <div className="col-sm-12 p-2">
                    <small className="text-info">ID</small>
                        <h6>{this.props.id_spp}</h6>
                    </div>
                    <div className="desc col-sm-12">
                        {/* Description */}
                        <h5 className="text-bold">
                            Nominal: {this.props.nominal}
                        </h5>
                        <h6>
                            Tahun: {this.props.tahun}
                        </h6>

                        <div className="col-sm-6">
                            <button className="btn btn-sm btn-primary btn-block"
                                onClick={this.props.onEdit}
                                style={{borderRadius: "40%"}, {fontSize: "20px"}}>
                                    <span className="fas fa-user-edit"></span>
                            </button>

                            <button className="btn btn-sm btn-block btn-danger"
                                onClick={this.props.onDrop} style={{borderRadius: "30%"}, {fontSize: "20px"}}>
                                    <span className="fas fa-trash"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}