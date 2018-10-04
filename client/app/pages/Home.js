import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import $ from 'jquery';
import Sidebar from  '../components/Sidebar';
import Header from  '../components/Header';


const baseurl = "http://10.2.1.49:5037/api"


class Home extends Component {

  constructor(props) {
      super(props);
   
  }

  render() {
    return (
          <div className="container-scroller">
          {/* header/header.component.html */}
          <Header />
          {/* /partial */}
          <div className="container-fluid page-body-wrapper">
            {/* sidebar/sidebar.component.html */}
            <Sidebar />
            {/* /partial */}
            <div className="main-panel">
              <div className="content-wrapper">
                {this.props.children}
              </div>
              {/* content-wrapper ends */}
              {/* partial:partials/_footer.html */}
              <footer className="footer">
                <div className="container-fluid clearfix">
                  <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © 2018 <a href="http://www.bootstrapdash.com/" target="_blank">IndiaNIC</a>. All rights reserved.</span>
                </div>
              </footer>
              {/* partial */}
            </div>
            {/* main-panel ends */}
          </div>
          {/* page-body-wrapper ends */}
        </div>
    );
  }
}

export default withRouter(Home);
