import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Toggle from 'react-toggle';
import Home from './Home';
import swal from 'sweetalert';
import user from '../reducers/user';
import * as actions from '../actions';


class Editprofileuser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            mobile: "",
            emailId: "",
            selectedFile: null,
            imagePreviewUrl: "",
            filename:""
        };
    }

    handleEdit(dynamicData) {
        console.log('data ' + (dynamicData.userId));
        let access_token = this.props.token;
        console.log('token ' + (access_token));
        var self = this;
        try {
            var udata = {
                userIds: [dynamicData.userId]
            }
            console.log('data ', JSON.stringify(udata));
            this.props.editUserlist(udata, access_token, (response) => {
                console.log(access_token);
                let { data } = response;
                if (data.status == 1) {
                    console.log("here")
                    self.setState({ error: null, userdata: data.data })
                    swal(response.data.message);
                    console.log(this.state.userdata);
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

    componentDidMount(nextProps) {
        console.log('nextprops ', this.props.userEditData)
        this.setState({
            userId: this.props.userEditData.userId,
            firstname: this.props.userEditData.firstname,
            lastname: this.props.userEditData.lastname,
            mobile: this.props.userEditData.mobile,
            emailId: this.props.userEditData.emailId,

        });
    }


    editSubmit(e) {
        e.preventDefault();
        const formData = new FormData()
        formData.append('photo', this.state.selectedFile, this.state.filename)
        let access_token = this.props.token;
        console.log(access_token);
        var self = this;
        try {
            var udata = {
                photo:this.state.filename,
                uid: this.state.userId,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                mobile: this.state.mobile,
                emailId: this.state.emailId
            }
            console.log('data ', JSON.stringify(udata));
            this.props.submitUserlist(udata, access_token, (response) => {
                console.log(access_token);
                let { data } = response;
                if (data.status == 1) {
                   swal({title:data.message})
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

    fileChangedHandler(event) {
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
        
        console.log(this.props.userEditData)
        let { imagePreviewUrl } = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            imagePreview = (<img src={"/assets/images/no-image-icon-4.png"} />);
        }

        return (
            <div>
                <Home >
                    <div>
                        <div className="card-body">
                            <h4 className="card-title">Edit User Detail</h4>
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
                                                        <input className="file-input" type="file" name="profile_photo" accept="image/*" id="profile" onChange={this.fileChangedHandler.bind(this)} />
                                                    </label>
                                                    <a><i className="fa fa-camera" aria-hidden="true" /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">First Name</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" type="text" name="firstname" placeholder="Enter First Name" id="firstname" required
                                                value={this.state.firstname} onChange={(e) => this.setState({ firstname: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">Last Name</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" type="text" name="lastname" placeholder="Enter Last Name" id="lastname" required
                                                value={this.state.lastname} onChange={(e) => this.setState({ lastname: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">Email</label>
                                        <div className="col-sm-7">
                                            <input className="form-control" type="text" name="emailId" placeholder="Enter email" id="emailId" required
                                                value={this.state.emailId} onChange={(e) => this.setState({ emailId: e.target.value })} />
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
                                            <button type="submit" className="btn btn-primary" onClick={this.editSubmit.bind(this)}>
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
    userEditData: state.admin.editUser,
    token: state.admin.user.access_token
});


export default withRouter(connect(mapStateToProps, actions)(Editprofileuser));
