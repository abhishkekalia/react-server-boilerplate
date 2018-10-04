import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Home from './Home';


class MediaManagement extends Component {

constructor(props) {
      super(props);
      this.state = {
   
      };
  }
  
render() {
    return (
        <Home> 
             <div className="row">
          <div className="col-md-4">
            <h3>Media Management</h3>
          </div>
          <div className="col-md-8">
            <div className="button-continer text-right">
              {/* <button type="button" class="btn btn-primary" [routerLink]="['/main/cms/cms-detail','new']" >
      	<i class="mdi mdi-plus"></i>
      	Upload File
      </button> */}
              <a className="nav-link option-button" href="javascript:;">
                <i className="icon-grid" />
              </a>
              <a className="nav-link option-button active" href="javascript:;">
                <i className="icon-list" />
              </a>
            </div>
          </div>
        </div>
        <hr />
        new file upload 
        <div className="row media">
          <div className="col-md-3">
            <h3>Select files</h3>
            <div className="well my-drop-zone">
              Base drop zone
            </div>
            <div className="well my-drop-zone">
              Another drop zone
            </div>
            Multiple
            <input type="file" ng2fileselect multiple /><br />
            Single
            <input type="file" ng2fileselect />
          </div>
          <div className="col-md-9" style={{marginBottom: 40}}>
            <h3>Upload queue</h3>
            <p>Queue length: {'{'}{'{'} uploader?.queue?.length {'}'}{'}'}</p>
            <table className="table">
              <thead>
                <tr>
                  <th width="50%">Name</th>
                  <th>Size</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>{'{'}{'{'} item?.file?.name {'}'}{'}'}</strong></td>
                  <td nowrap>{'{'}{'{'} item?.file?.size/1024/1024 | number:'.2' {'}'}{'}'} MB</td>
                  <td>
                    <div className="progress" style={{marginBottom: 0}}>
                      <div className="progress-bar" role="progressbar"/>
                    </div>
                  </td>
                  <td className="text-center">
                    <span><i className="glyphicon glyphicon-ok" /></span>
                    <span><i className="glyphicon glyphicon-ban-circle" /></span>
                    <span><i className="glyphicon glyphicon-remove" /></span>
                  </td>
                  <td nowrap>
                    <button type="button" className="btn btn-success btn-xs">
                      <span className="glyphicon glyphicon-upload" /> Upload
                    </button>
                    <button type="button" className="btn btn-warning btn-xs">
                      <span className="glyphicon glyphicon-ban-circle" /> Cancel
                    </button>
                    <button type="button" className="btn btn-danger btn-xs">
                      <span className="glyphicon glyphicon-trash" /> Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <div>
                Queue progress:
                <div className="progress" style={{}}>
                  <div className="progress-bar" role="progressbar"/>
                </div>
              </div>
              <button type="button" className="btn btn-success btn-s">
                <span className="glyphicon glyphicon-upload" /> Upload all
              </button>
              <button type="button" className="btn btn-warning btn-s">
                <span className="glyphicon glyphicon-ban-circle" /> Cancel all
              </button>
              <button type="button" className="btn btn-danger btn-s">
                <span className="glyphicon glyphicon-trash" /> Remove all
              </button>
              {/* 
          <button type="button" class="btn btn-danger btn-s"
                  (click)="showFileArr()">
              <span class="glyphicon glyphicon-upload"></span> Test Upload
          </button>
 */}
            </div>
          </div>
          <hr />
          <div className="animated fadeInUp">
            {/* Data table start */}
            <div className="list-view">
              <table sortable-table className="table dataTable row-border hover custom-table">
                <thead>
                  <tr>
                    <th sortable-column="title">Media</th>
                    <th sortable-column="pageId">Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="thumb-img media-list">
                        <img src='assets/images/no-image.png' />
                      </div>
                    </td>
                    <td>{'{'}{'{'}i.name{'}'}{'}'}</td>
                    <td>
                      <div className="delete-icon">
                        <a href="javascript:;" title="Delete"><i className="mdi mdi-delete" /></a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
              <ul className="thumbnail-item">
                <li >
                  <a href="javascript:;" title="Show Media" >
                    <div className="grid-img-container">
                      <img alt />
                    </div>
                  </a>
                  <label className>{'{'}{'{'}i.name{'}'}{'}'}</label>
                </li>
              </ul>
            {/* Data table end */}
            {/* Pagination start */}
           
            {/* Pagination end */}  
          </div>
        </div>
        </Home>
    );
  }
}

export default withRouter(MediaManagement);
