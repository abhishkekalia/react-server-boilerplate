import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Home from './Home';


class NotificationManagement extends Component {


  constructor(props) {
      super(props);
      this.state = {
   
      };
  }


  render() {
    return (
     <Home>
          <div>
        <div className="row">
          <div className="col-md-6">
            <h3>Email Notification Settings</h3>
          </div>
        </div>
        <hr />
        <div className="animated fadeInUp">
          <div className="profilepage">
            <div className="p-20">
              <div className="row">
                <div className="col-md-12">
                  <div className="checkbox-style2">
                    <div className="form-check form-check-flat">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/> 
                        <i className="input-helper" />A new user has been registered.</label>
                    </div>
                    <div className="form-check form-check-flat">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/> 
                        <i className="input-helper" />User has filled the timesheet.</label>
                    </div>
                    <div className="form-check form-check-flat">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/> 
                        <i className="input-helper" />User has filled the expense</label>
                    </div>
                    <div className="form-check form-check-flat">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/> 
                        <i className="input-helper" />User has assigned any timesheet template.</label>
                    </div>
                    <div className="form-check form-check-flat">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/> 
                        <i className="input-helper" />User has assigned any expense template.</label>
                    </div>
                    <div className="form-check form-check-flat">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/> 
                        <i className="input-helper" />User has rejected any timesheet.</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <hr className="line m-0" />
            <br />
            <div className="p-20">
              <div className="row">
                <div className="col-xs-12">
                  <div className="btn-block">
                    <a className="btn btn-primary">Save</a>
                    <a  className="btn btn-secondary" onClick={() => this.props.history.push('/user-list')}>cancel</a>
                  </div>
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

export default withRouter(NotificationManagement);
