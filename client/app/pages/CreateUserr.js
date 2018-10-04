import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from './Home';
import swal from 'sweetalert';
import user from '../reducers/user';
import * as actions from '../actions';


class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
           firstname:"",
           lastname:"",
           mobile:"",
           email:"",
           username:"",
           password:"",
           selectedFile: null,
           imagePreviewUrl:"",
           filename:""
        };
    }

 


    submitNewuser(e){
        e.preventDefault();
        var access_token=this.props.token;
        var self = this;
        try {
            var udata = {
                photo:this.state.filename,
               username:this.state.username,
               firstname:this.state.firstname,
               lastname:this.state.lastname,
               mobile:this.state.mobile,
               email:this.state.email,
               password:this.state.password
            }
            console.log('data ', JSON.stringify(udata));
            this.props.submitnewUser(udata,access_token,(response) => {
                let { data } = response;
                if (data.status == 1) {
                    self.setState({ error: null, userdata: data.data })
                    swal("status  data submited  successful");
                    self.props.history.push("/user-list")
                }
                else {
                    swal(data.message, '', 'error');
                }
            }).catch(error => {
                return error;
            });
        } catch (err) {
            console.log("here")
            console.log("error is " + JSON.stringify(err));
        }

      }

      fileChangedHandler(event){
        let reader = new FileReader();
        let file = event.target.files[0];
        let filename = event.target.files[0].name;
        reader.onloadend = () => {
          this.setState({
            file: file,
            filename:filename,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
     }
      
render() {  
    let {imagePreviewUrl} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      imagePreview = (<img src={"/assets/images/no-image-icon-4.png"}/>);
    }
     

        return (
           <div>
            <Home >
                  <div>
                    <div className="card-body">
                        <h4 className="card-title">Register New User</h4>
                        <div className="card-center-block">
                            <hr />
                            <form className="form-sample">
                            <div className="form-group row">
                                    <label className="col-sm-5 col-form-label">Profile Picture</label>
                                    <div className="col-sm-7">
                                        <div className="profile-img">
                                            <div className="inner-image">
                                              {imagePreview}
                                            </div>
                                            <div className="upload-file">
                                                <label>
                                                    <input className="file-input" type="file" name="profile_photo" accept="image/*" id="profile"  onChange={this.fileChangedHandler.bind(this)}/>
                                                </label>
                                                <a><i className="fa fa-camera" aria-hidden="true" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             
                                <div className="form-group row">
                                    <label className="col-sm-5 col-form-label">User Name</label>
                                    <div className="col-sm-7">
                                        <input className="form-control" type="text" name="Username" placeholder="Enter User Name" id="username" required   
                                        value={this.state.username}  onChange={(e) => this.setState({ username: e.target.value })} /> 
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-5 col-form-label">First Name</label>
                                    <div className="col-sm-7">
                                        <input className="form-control" type="text" name="firstname" placeholder="Enter First Name" id="firstname" required   
                                        value={this.state.firstname}  onChange={(e) => this.setState({ firstname: e.target.value })} /> 
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-5 col-form-label">Last Name</label>
                                    <div className="col-sm-7">
                                        <input className="form-control" type="text" name="lastname" placeholder="Enter Last Name" id="lastname" required  
                                        value={this.state.lastname}  onChange={(e) => this.setState({ lastname: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-5 col-form-label">Password</label>
                                    <div className="col-sm-7">
                                        <input className="form-control" type="text" name="lastname" placeholder="Enter Last Name" id="lastname" required  
                                        value={this.state.password}  onChange={(e) => this.setState({ password: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-5 col-form-label">Email</label>
                                    <div className="col-sm-7">
                                        <input className="form-control" type="text" name="emailId" placeholder="Enter email" id="emailId" required 
                                         value={this.state.email}  onChange={(e) => this.setState({ email: e.target.value })} />
                                        <div className="error-block">

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-5 col-form-label">Mobile No.</label>
                                    <div className="col-sm-7">
                                        <input className="form-control" minLength={10} maxLength={10} type="text" name="mobile" placeholder="Enter Mobile No." id="mobile" required 
                                         value={this.state.mobile} onChange={(e) => this.setState({ mobile: e.target.value })} />
                                        <div className="error-block">
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group row">
                                    <div className="button-group-container">
                                        <button type="submit" className="btn btn-primary" onClick={this.submitNewuser.bind(this)}> 
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
        

            
            export default withRouter(connect(mapStateToProps, actions)(CreateUser));
