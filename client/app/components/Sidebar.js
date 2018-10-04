import React, { Component } from 'react';
import {withRouter} from "react-router-dom";


class Sidebar extends Component {

  constructor(props) {
      super(props);
      this.state = {

      };
      this.changeRoute = this.changeRoute.bind(this);
  }

    changeRoute(page) {
           this.props.history.push(page);
    }


  render() {
    let path = this.props.location.pathname;
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className={path == '/dashboard' ? 'nav-item active' : 'nav-item'} onClick={this.changeRoute.bind(this,'/dashboard')}>
          <a className="nav-link">
            <i className="fa fa-bar-chart" aria-hidden="true" />
            <span className="menu-title">Dashboard</span>
          </a>
        </li>
        <li className={path == '/user-list' ? 'nav-item active' : 'nav-item'} onClick={this.changeRoute.bind(this,'/user-list')}>
          <a className="nav-link">
            <i className="fa fa-user-o" aria-hidden="true" />
            <span className="menu-title">User Management</span>
          </a>
        </li>
        <li className={path == '/cms-list' ? 'nav-item active' : 'nav-item'}  onClick={this.changeRoute.bind(this,'/cms-list')}>
          <a className="nav-link">
            <i className="fa fa-file-text-o" aria-hidden="true" />
            <span className="menu-title">CMS Management</span>
          </a>
        </li>
        <li className={path == '/email-list' ? 'nav-item active' : 'nav-item'}  onClick={this.changeRoute.bind(this,'/email-list')}>
          <a className="nav-link">
            <i className="fa fa-envelope-o" aria-hidden="true" />
            <span className="menu-title">Email Content Management</span>
          </a>
        </li>
        <li className={path == '/media' ? 'nav-item active' : 'nav-item'}  onClick={this.changeRoute.bind(this,'/media')}>
          <a className="nav-link">
            <i className="fa fa-folder-o" aria-hidden="true" />
            <span className="menu-title">Media Management</span>
          </a>
        </li>
        <li className={path == '/blog-list' ? 'nav-item active' : 'nav-item'}  onClick={this.changeRoute.bind(this,'/blog-list')}>
          <a className="nav-link">
            <i className="fa fa-rss" aria-hidden="true" />
            <span className="menu-title">Blog Management</span>
          </a>
        </li>
        <li className={path == '/home' ? 'nav-item active' : 'nav-item'}  onClick={this.changeRoute.bind(this,'/home')}>
          <a className="nav-link">
            <i className="fa fa-home" aria-hidden="true" />
            <span className="menu-title">Home Section Management</span>
          </a>
        </li>
        <li className={path == '/seo-list' ? 'nav-item active' : 'nav-item'}  onClick={this.changeRoute.bind(this,'/seo-list')}>
          <a className="nav-link">
            <i className="fa fa-search" aria-hidden="true" />
            <span className="menu-title">SEO Settings</span>
          </a>
        </li>
        <li className={path == '/notification' ? 'nav-item active' : 'nav-item'}  onClick={this.changeRoute.bind(this,'/notification')}>
          <a className="nav-link">
            <i className="fa fa-bell-o" aria-hidden="true" />
            <span className="menu-title">Notification Settings</span>
          </a>
        </li>
       </ul>
    </nav>
    );
  }
}

export default withRouter(Sidebar);
