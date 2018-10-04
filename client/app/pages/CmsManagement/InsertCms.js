import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Trumbowyg from 'react-trumbowyg';
import 'react-trumbowyg/dist/trumbowyg.min.css';
import Toggle from 'react-toggle';
import Home from '../Home';
import swal from 'sweetalert';
import user from '../../reducers/user';
import * as actions from '../../actions';



class InsertCms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageId: "",
            _id: "",
            metaTitle: "",
            metaKeyword: "",
            metaDescription: "",
            title: "",
            content:"",
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

    componentDidMount() {
        console.log('  content', this.props.EditData.pageId
    );
        this.setState({
            _id: this.props.EditData._id,
            pageId: this.props.EditData.pageId,
            metaTitle: this.props.EditData.metaTitle,
            metaKeyword: this.props.EditData.metaKeyword,
            metaDescription: this.props.EditData.metaDescription,
            title: this.props.EditData.title,
            content: this.props.EditData.content

        });
    }


    editSubmit(e) {
        e.preventDefault();
        let access_token = this.props.token;
        console.log(access_token);
        var self = this;
        console.log('data  content', this.state.content);
        try {
            var udata = {
                content: this.state.content,
                pageId: this.state.pageId,
                metaTitle: this.state.metaTitle,
                metaKeyword: this.state.metaKeyword,
                metaDescription: this.state.metaDescription,
                title: this.state.title,
             }
            console.log('data  95', JSON.stringify(udata));
            this.props.submitCsmlist(udata, access_token, (response) => {
                console.log(access_token);
                let { data } = response;
                if (data.status == 1) {
                    swal({ title: data.message })
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
                filename: filename,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }


    handleChange(e){
        this.setState({content:e.target.value})
    }
    

    render() {
           console.log(this.props.EditData)
       return (
            <div>
                <Home >
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title" >Add New CMS</h4>
                                <div>
                                    <hr />
                                    <form className="form-sample">
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Page Id</label>
                                            <div className="col-sm-10">
                                            <input className="form-control" type="text" name="metaTitle" placeholder="Enter Meta Title" id="metaTitle"
                                                    value={this.state.pageId} onChange={(e) => this.setState({ pageId: e.target.value })} />
                                            </div>

                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Meta Title</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" name="metaTitle" placeholder="Enter Meta Title" id="metaTitle"
                                                    value={this.state.metaTitle} onChange={(e) => this.setState({ metaTitle: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Meta Keyword</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" name="metaKeyword" placeholder="Enter Meta Title" id="metaKeyword"
                                                    value={this.state.metaKeyword} onChange={(e) => this.setState({ metaKeyword: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Meta Description</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" name="metaDescription" placeholder="Enter Meta Description" id="metaDescription" required
                                                    value={this.state.metaDescription} onChange={(e) => this.setState({ metaDescription: e.target.value })} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Title</label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" name="title" placeholder="Enter Title" id="title"
                                                    value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                                            </div>

                                        </div>
                                        <hr/>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Content</label>
                                            <div className="col-sm-10">
                                             <Trumbowyg id='react-trumbowyg' data={this.state.content}   onChange={this.handleChange.bind(this)}  />
                                             </div>

                                       </div>
                                        <div className="form-group row">
                                            <div className="button-group-container">
                                                <button type="button" className="btn btn-primary" onClick={this.editSubmit.bind(this)}>Submit
                                                </button>
                                                <button type="button" className="btn btn-warning" onClick={() => this.props.history.push('/cms-list')}>Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div >
                </Home>
            </div>

        );
    }
}


const mapStateToProps = state => ({
    EditData: state.admin.editUser,
    token: state.admin.user.access_token
});


export default withRouter(connect(mapStateToProps, actions)(InsertCms));
