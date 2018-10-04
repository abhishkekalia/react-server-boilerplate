import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Home from './Home';


class HomeSectionManagement extends Component {



  constructor(props) {
      super(props);
      this.state = {
   
      };
  }


  render() {
    return (
     <Home> 
        <div className="coming-soon text-center">
	        <img src="assets/images/coming_soon.png" alt="" />
       </div>
     </Home>
    );
  }
}

export default withRouter(HomeSectionManagement);
