import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Trumbowyg from 'react-trumbowyg';
import 'react-trumbowyg/dist/trumbowyg.min.css';
import ImageUploader from 'react-images-upload';
import Toggle from 'react-toggle';
import Home from '../Home';
import swal from 'sweetalert';
import user from '../../reducers/user';
import * as actions from '../../actions';



class InsertBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogTitle: "",
            metaTitle: "",
            metaKeyword: "",
            metaDescription: "",
            title: "",
            content: "",
            pictures: []
        };
 
         this.onDrop = this.onDrop.bind(this);
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
            blogTitle: this.props.EditData.blogTitle,
            metaTitle: this.props.EditData.metaTitle,
            metaKeyword: this.props.EditData.metaKeyword,
            metaDescription: this.props.EditData.metaDescription,
            blogTitle: this.props.EditData.blogTitle,
            blogContent: this.props.EditData.blogContent

        });
    }

    editSubmit(e) {
        e.preventDefault();
        let access_token = this.props.token;
        console.log(access_token);
        var self = this;
        console.log('data  content', this.state.blogContent);
        try {
            var udata = {
                blogContent: this.state.blogContent,
                metaTitle: this.state.metaTitle,
                metaKeyword: this.state.metaKeyword,
                metaDescription: this.state.metaDescription,
                blogTitle: this.state.blogTitle,
                pictures:this.state.pictures
            }
            console.log('data  95', JSON.stringify(udata));
            this.props.submitBloglist(udata, access_token, (response) => {
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


    handleChange(e) {
        this.setState({ content: e.target.value })
    }


    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render() {
        console.log(this.props.EditData)
        return (
            <div>
                <Home >
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title" >Edit New Blog</h4>
                                <div>
                                    <hr />
                                    <form className="form-sample">
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Blog Title </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" type="text" name="metaTitle" placeholder="Enter Meta Title" id="metaTitle"
                                                    value={this.state.blogTitle} onChange={(e) => this.setState({ blogTitle: e.target.value })} />
                                            </div>

                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label"> Blog Content</label>
                                            <div className="col-sm-10">
                                                <Trumbowyg id='react-trumbowyg' data={this.state.blogContent} onChange={this.handleChange.bind(this)} />
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

                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Upload Image</label>
                                            <div className="col-sm-10">
                                                <ImageUploader
                                                    className="form-control" 
                                                    withIcon={true}
                                                    buttonText='Choose images'
                                                    withPreview={true}
                                                    onChange={this.onDrop}
                                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                    maxFileSize={5242880}
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="form-group row">
                                            <div className="button-group-container">
                                                <button type="button" className="btn btn-primary" onClick={this.editSubmit.bind(this)}>Submit
                                                </button>
                                                <button type="button" className="btn btn-warning" onClick={() => this.props.history.push('/blog-list')}>Cancel</button>
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


export default withRouter(connect(mapStateToProps, actions)(InsertBlog));
