import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChangePasswordComponent from '../components/ChangePassword';



class ChangePassword extends Component {



  constructor(props) {
      super(props);
      this.state = {

      };
 }



  render() {

    return (
      <div>
      <div className="resp-menu">
         <Sidebar />
      </div>
      {/* start header */}
         <Header />
      {/* end header */}
      {/* Start Content */}
         <ChangePasswordComponent />
    </div>
    );
  }
}

export default withRouter(ChangePassword);
