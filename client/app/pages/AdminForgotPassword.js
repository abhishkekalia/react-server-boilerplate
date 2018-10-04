import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Toggle from 'react-toggle';
import Home from './Home';
import swal from 'sweetalert';
import user from '../reducers/user';
import * as actions from '../actions';


class AdminForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
           
        };
    }

   
    adminpassword(){
        let access_token=this.props.token;
         var udata={oldPassword:this.state.oldPassword,newPassword:this.state.newPassword,confirmPassword:this.state.confirmPassword}; 
         console.log(access_token)
         this.props.adminPassword(udata, access_token, (response) => {
           let { data } = response;
           if (data.status == 1) {
             console.log("here")
           }
           else {
             swal(data.message, '', 'error');
           }
         }).catch(error => {
           return error;
         });
      
     }
    



    render() {

        return (
            <div>
                <Home >
                    <div>
                        <div className="card-body">
                            <h4 className="card-title">Admin Password Update Form</h4>
                            <div className="card-center-block">
                                <hr />
                                <form className="form-sample">
                                 <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">Old Password</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" type="password" name="oldpassword" placeholder="Enter Old Password" id="oldpassword" required
                                                onChange={(e) => this.setState({ oldPassword: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">New Password</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" type="password" name="newpassword" placeholder="Enter New Password" id="newpassword" required
                                                 onChange={(e) => this.setState({ newPassword: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">Confirm Password</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" type="password" name="confirmpassword" placeholder="Enter Confirm Password" id="confirmpassword" required
                                                onChange={(e) => this.setState({ confirmPassword: e.target.value })} />
                            
                                        </div>
                                    </div>
                                   <hr />
                                    <div className="form-group row">
                                        <div className="button-group-container">
                                            <button type="button" className="btn btn-primary" onClick={this.adminpassword.bind(this)}>
                                               <span>Submit</span>
                                            </button>
                                            <button type="button" className="btn btn-warning" onClick={() => this.props.history.push('/user-list')}>Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div >
                        </div >
                    </div >
                </Home>
            </div>

        );
    }
}


const mapStateToProps = state => ({
    token: state.admin.user.access_token
});


export default withRouter(connect(mapStateToProps,actions)(AdminForgotPassword));
