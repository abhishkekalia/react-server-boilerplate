import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';
import swal from 'sweetalert';


class Header extends Component {

 constructor(props) {
      super(props);
      this.state = {
            user: props.user
      };
      this.logout = this.logout.bind(this);
  }

 logout(){
         this.props.logOut();
         this.props.history.push("/")
    }

    componentWillReceiveProps(nextProps){
          let {user} = nextProps;
          this.setState({user});
    }


    componentDidMount(){
      let access_token = this.props.token;
      console.log(access_token);
      var self = this;
      try {
          var udata = {
               id: this.props.adminId,
            }
          console.log('data ', JSON.stringify(udata));
          this.props.adminProfile(udata, access_token, (response) => {
              console.log(access_token);
              let { data } = response;
              if (data.status == 1) {
                 
              }
              else {
                  swal(response.data.message, '', 'error');
              }
          }).catch(error => {
              return error;
          });
      } catch (err) {
          console.log("here")
          console.log("error is " + JSON.stringify(err));
      

  }
}


  render() {

    let {user} = this.state;
    return (
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
        <a className="navbar-brand brand-logo" href="javascript:;"><img src="assets/images/logo.png" alt="logo" /></a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center">
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown">
            <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
              <i className="fa fa-bell" />
              <span className="count">4</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
              <a className="dropdown-item">
                <p className="mb-0 font-weight-normal float-left">You have 4 new notifications
                </p>
                <span className="badge badge-pill badge-warning float-right">View all</span>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-success">
                    <i className="fa fa-info" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-medium">Application Error</h6>
                  <p className="font-weight-light small-text">
                    Just now
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-warning">
                    <i className="fa fa-comment-o" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-medium">Settings</h6>
                  <p className="font-weight-light small-text">
                    Private message
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-info">
                    <i className="fa fa-envelope-o" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-medium">New user registration</h6>
                  <p className="font-weight-light small-text">
                    2 days ago
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
              <i className="fa fa-envelope" />
              <span className="count">7</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
              <div className="dropdown-item">
                <p className="mb-0 font-weight-normal float-left">You have 7 unread mails
                </p>
                <span className="badge badge-info badge-pill float-right">View all</span>
              </div>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img src="assets/images/faces/face4.jpg" alt="image" className="profile-pic" />
                </div>
                <div className="preview-item-content flex-grow">
                  <h6 className="preview-subject ellipsis font-weight-medium">David Grey
                    <span className="float-right font-weight-light small-text">1 Minutes ago</span>
                  </h6>
                  <p className="font-weight-light small-text">
                    The meeting is cancelled
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img src="assets/images/faces/face2.jpg" alt="image" className="profile-pic" />
                </div>
                <div className="preview-item-content flex-grow">
                  <h6 className="preview-subject ellipsis font-weight-medium">Tim Cook
                    <span className="float-right font-weight-light small-text">15 Minutes ago</span>
                  </h6>
                  <p className="font-weight-light small-text">
                    New product launch
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img src="assets/images/faces/face3.jpg" alt="image" className="profile-pic" />
                </div>
                <div className="preview-item-content flex-grow">
                  <h6 className="preview-subject ellipsis font-weight-medium"> Johnson
                    <span className="float-right font-weight-light small-text">18 Minutes ago</span>
                  </h6>
                  <p className="font-weight-light small-text">
                    Upcoming board meeting
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link count-indicator dropdown-toggle dp-corner" id="messageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
             </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
              <a className="dropdown-item preview-item" onClick={()=>this.props.history.push("/adminprofile")}>
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-primary">
                    <i className="fa fa-info" />
                  </div>
                </div>
                
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-medium">
                     My Profile
                  </h6>
                </div>
              </a>
              <a className="dropdown-item preview-item" onClick={()=>this.props.history.push("/adminpassword")}>
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-primary">
                    <i className="fa fa-info" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-medium">
                    Change Password
                  </h6>
                </div>
              </a>
              <div className="dropdown-divider" />
              <div className="dropdown-item logout-container">
                <a  className="btn btn-primary btn-rounded btn-fw" onClick={this.logout.bind(this)}>Logout</a>
              </div>
            </div>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span className="icon-menu" />
        </button>
      </div>
    </nav>
    );
  }
}

const mapStateToProps = state => ({
  token: state.admin.user.access_token,
  adminId:state.admin.user._id
});

export default withRouter(connect(mapStateToProps, actions)(Header));
