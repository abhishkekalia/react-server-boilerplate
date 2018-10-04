import React, { Component } from 'react';
import { withRouter } from "react-router-dom";


class Csvpart extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.changeRoute = this.changeRoute.bind(this);
    }

    changeRoute(page) {
        this.props.history.push(page);
    }


    render() {
        let path = this.props.location.pathname;
        return (
            <div className="row">
                <div className="col-md-4">
                    <h3>User Management</h3>
                </div>
                <div className="col-md-8">
                    <div className="button-continer text-right">
                        <div className="file-upload">
                            <label htmlFor="upload" className="btn btn-primary">
                                <i className="mdi mdi-upload" /> Upload CSV
            </label>
                            <input id="upload" className="file-upload__input" accept=".csv" type="file" name="file-upload" onClick={this.handleCsvChange.bind(this)} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.DownloadCsvChange.bind(this)}><i className="mdi mdi-download" /> Download CSV</button>
                        <button type="button" className="btn btn-primary" onClick={() => this.props.history.push('/newuser')}><i className="mdi mdi-plus" /> Add User</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Csvpart);
