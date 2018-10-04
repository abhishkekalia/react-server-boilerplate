import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Toggle from 'react-toggle';
import swal from 'sweetalert';
import user from '../reducers/user';
import * as actions from '../actions';


class Sortcolumn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            filteredData: []

        };
    }

    render() {
        console.log(this.props.flag)
        return (
            <div >
                {(this.props.flag == true) ? (
                       <table className="table dataTable with-image row-border hover custom-table">
                       <thead>
                         <tr>
                           <th width="5%">
                             <div className="form-check form-check-flat">
                               <label className="form-check-label">
                                 <input type="checkbox" className="form-check-input" onChange={this.DeleteAllbox.bind(this, this.state.userdata)} />
                                 <i className="input-helper" />
                               </label>
                             </div>
                           </th>
                           <th width="5%" />
                           <th width="13%" sortable-column="firstname" onClick={this.onSort('firstname ')}>First Name <span id="sort-direction" className={this.setArrow('firstname')}></span></th>
                           <th width="12%" sortable-column="lastname" onClick={this.onSort('lastname ')}>Last Name  <span id="sort-direction" className={this.setArrow('lastname')}></span></th>
                           <th width="20%" sortable-column="emailId" onClick={this.onSort('email ')}>Email  <span id="sort-direction" className={this.setArrow('email')}></span></th>
                           <th width="15%" sortable-column="mobile" onClick={this.onSort('mobile ')}>Mobile  <span className={this.setArrow('mobile')}></span></th>
                           <th width="5%" sortable-column="status" >Status</th>
                           <th width="5%" sortable-column="verificationStatus">Verified</th>
                           <th width="10%"> Action</th>
                           {/* <th width="20%"></th> */}
                         </tr>
                       </thead>
                       </table>
                  ) : (<div> </div>)
                }
            </div>

        );
    }
}


const mapStateToProps = state => ({
    userEditData: state.admin.editUser,

});


export default withRouter(connect(mapStateToProps, actions)(Sortcolumn));
