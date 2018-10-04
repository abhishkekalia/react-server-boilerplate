import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { connect } from 'react-redux';

import * as actions from '../actions';


const baseurl = "http://10.2.11:4069/api"

class Login extends Component {


  constructor(props) {
      super(props);
      this.state = {
          error: null,
          email:"",
          password:"",
          rememberMe: false
      };
      this.login = this.login.bind(this);
      this.showForgotPassword = this.showForgotPassword.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }


  login(e){
      e.preventDefault();
      var self =this;
      console.log('login called ')
      let {email,password,rememberMe} = this.state;
      if(email.trim()=="" || password.trim()==""){
            swal('Please provide complete information.','','error');
            return false;
      }
      console.log("email is  "+email+" password is "+password);
      try {
          if(rememberMe){
            localStorage.setItem('inic_id', email);
            localStorage.setItem('inic_pass', password);
          }else{
            localStorage.removeItem('inic_id');
            localStorage.removeItem('inic_pass');
          }
          let data = {email:email,password:password};
          this.props.signIn(data, (response) => {
                let {data}=response;
                if(data.status == 1){
                    self.setState({error:null,email:"",password:""})
                    swal("Login successful");
                    self.props.history.push("/dashboard")
                }
                else {
                   swal(data.message,'','error');
                }
          }).catch(error => {
            return error;
          });
      } catch (err) {
          console.log("error is "+JSON.stringify(err));
      }
  }

  handleChange(event) {
     this.setState({ [event.target.name]: event.target.value });
   }


   showForgotPassword(){
        swal({
          title: "Forgot Password",
          text: 'Please enter the registered email id. You will receive reset password link.',
          content: "input",
          button: {
            text: "Submit",
            closeModal: true,
          },
        })
        .then(name => {
          console.log('name is ...'+name);
          if (!name) throw null;
        
         // return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
        })
        .then(results => {
          return results.json();
        })
        .then(json => {
          const movie = json.results[0];
        
          if (!movie) {
            return swal("No movie was found!");
          }
        
          const name = movie.trackName;
          const imageURL = movie.artworkUrl100;
        
          swal({
            title: "Top result:",
            text: name,
            icon: imageURL,
          });
        })
        .catch(err => {
          if (err) {
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
  }


  saveUser(){
    console.log("done")
    localStorage.setItem("Login Id",this.state.email)
    localStorage.setItem("Password",this.state.password)
    localStorage.setItem("RememberMe",this.state.rememberMe)
  }
  


  render() {
   let {error} = this.state;
    return (

      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth login-full-bg">
            <div className="row w-100 margin-l-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5">
                  <div className="login-header">
                    <img src="assets/images/logo.png" />
                    <hr />
                    <h4 className="font-weight-light">Admin Login</h4>
                  </div>
                  <form className="pt-5" autoComplete="off" onSubmit={this.login}>
                    <div className="form-group">
                      <input className="form-control" type="text" name="email" placeholder="Enter Email" pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" onChange={this.handleChange}/>
                      <i className="fa fa-user" aria-hidden="true" />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="password" name="password" placeholder="Enter Password" id="password" required onChange={this.handleChange}/>
                      <i className="fa fa-lock" aria-hidden="true" />
                    </div>
                    <div className="mt-5">
                      <button className="btn btn-block btn-primary btn-lg font-weight-medium" type="submit">Login</button>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-6">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="rememberMe"  onClick={this.saveUser.bind(this)}/>
                            Remember Password
                            <i className="input-helper" /></label>
                        </div> 
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="mt-3 text-right">
                          <a onClick={this.showForgotPassword} className="auth-link text-gray" >Forgot password?</a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* content-wrapper ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>

    );
  }
}

export default connect(null, actions)(withRouter(Login));
