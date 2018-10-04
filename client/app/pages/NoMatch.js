import React, { Component } from 'react';
import {withRouter} from "react-router-dom";



class NoMatch extends Component {


   render() {

    return (
         
            <div className=" d-flex align-items-center text-center error-page bg-primary" style={{height:"100vh"}}>
              <div className="row flex-grow">
                <div className="col-lg-7 mx-auto text-white">
                  <div className="row align-items-center d-flex flex-row">
                    <div className="col-lg-6 text-lg-right pr-lg-4">
                      <h1 className="display-1 mb-0">404</h1>
                    </div>
                    <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                      <h2>SORRY!</h2>
                      <h3 className="font-weight-light">The page you’re looking for was not found.</h3>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-12 text-center mt-xl-2">
                      <a className="text-white font-weight-medium" style={{cursor:'pointer'}} onClick={() => {this.props.history.push("/")}}>Back to home</a>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-12 mt-xl-2">
                      <p className="text-white font-weight-medium text-center">Copyright © 2018  All rights reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
              
    );
  }
}

export default withRouter(NoMatch);
