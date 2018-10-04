import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

const baseurl = "http://10.2.1.49:5037/api"


class Forgot extends Component {



  constructor(props) {
      super(props);
      this.state = {
         error:null,
         email:""
      };
      this.forgotPassword = this.forgotPassword.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
     this.setState({ [event.target.name]: event.target.value });
   }


  forgotPassword(){
    var self =this;
    let {email,password} = this.state;
    console.log("email is  "+email);
        axios.post(baseurl+'/forgotPassword', {
              email: email
            })
            .then(function (response) {
              let {data}=response;
              if(data.status == 1){
                   self.setState({error:null,email:""})
                   swal(data.message+" : "+email);
                   self.props.history.push("/")
              }
              else {
                 console.log("error is "+data.message);
                   self.setState({error: data.message});
              }
              console.log("response is "+JSON.stringify(response));
            })
            .catch(function (error) {
               console.log("error is "+JSON.stringify(error));
            });
  }





  render() {
    let {error} = this.state;
    return (
      <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
              <div className="content-wrapper d-flex align-items-center auth login-full-bg">
                <div className="row w-100">
                  <div className="col-lg-4 mx-auto">
                    <div className="auth-form-dark text-left p-5">
                      <h2>Forgot Password</h2>
                      <form className="pt-5">
                      {
                         (error)?(
                               <div className="alert alert-danger" role="alert">{error}</div>
                         ):(null)
                      }
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"  name="email" onChange={this.handleChange}/>
                          <i className="mdi mdi-account" />
                        </div>
                        <div className="mt-5">
                          <a className="btn btn-block btn-warning btn-lg font-weight-medium" onClick={this.forgotPassword}>Submit</a>
                        </div>
                        <div className="mt-3 text-center">
                          <a onClick={() => {this.props.history.push("/")}} className="auth-link text-white">Login</a>
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

export default withRouter(Forgot);
