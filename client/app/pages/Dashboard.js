import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Home from './Home';
import Chart from '../components/Chart';


class Dashboard extends Component {
  constructor(props) {
      super(props);
      this.state = {
   
      };
  }

  render() {
    return (
      <Home>
            <div>
              <div className="row animated fadeInUp">
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
                    <div className="card card-statistics">
                    <div className="card-body">
                        <div className="clearfix">
                        <div className="float-left">
                            <i className="fa fa-money text-success icon-lg" />
                        </div>
                        <div className="float-right">
                            <p className="card-text text-right">Total Revenue</p>
                            <div className="fluid-container">
                            <h3 className="card-title font-weight-bold text-right mb-0">$65,650</h3>
                            </div>
                        </div>
                        </div>
                        <p className="text-muted mt-3">
                        <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true" /> 65% lower growth
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
                    <div className="card card-statistics">
                    <div className="card-body">
                        <div className="clearfix">
                        <div className="float-left">
                            <i className="fa fa-list-alt text-warning icon-lg" />
                        </div>
                        <div className="float-right">
                            <p className="card-text text-right">Orders</p>
                            <div className="fluid-container">
                            <h3 className="card-title font-weight-bold text-right mb-0">3455</h3>
                            </div>
                        </div>
                        </div>
                        <p className="text-muted mt-3">
                        <i className="mdi mdi-bookmark-outline mr-1" aria-hidden="true" /> Product-wise sales
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
                    <div className="card card-statistics">
                    <div className="card-body">
                        <div className="clearfix">
                        <div className="float-left">
                            <i className="fa fa-bar-chart text-teal icon-lg" />
                        </div>
                        <div className="float-right">
                            <p className="card-text text-right">Sales</p>
                            <div className="fluid-container">
                            <h3 className="card-title font-weight-bold text-right mb-0">5693</h3>
                            </div>
                        </div>
                        </div>
                        <p className="text-muted mt-3">
                        <i className="mdi mdi-calendar mr-1" aria-hidden="true" /> Weekly Sales
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
                    <div className="card card-statistics">
                    <div className="card-body">
                        <div className="clearfix">
                        <div className="float-left">
                            <i className="fa fa-address-card-o text-info icon-lg" />
                        </div>
                        <div className="float-right">
                            <p className="card-text text-right">Employees</p>
                            <div className="fluid-container">
                            <h3 className="card-title font-weight-bold text-right mb-0">246</h3>
                            </div>
                        </div>
                        </div>
                        <p className="text-muted mt-3">
                        <i className="mdi mdi-reload mr-1" aria-hidden="true" /> Product-wise sales
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title mb-4" />
                        <div className="chart-container">
                        <Chart />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
      </Home>
    );
  }
}

export default withRouter(Dashboard);
