import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import "bootstrap-less";
import { connect } from "react-redux";
import ReactFileReader from 'react-file-reader';
import 'rc-pagination/assets/index.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import Pagination from 'rc-pagination';
import Toggle from 'react-toggle';
import swal from 'sweetalert';
import user from '../../reducers/user';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import * as actions from '../../actions';
import Home from '../Home';
import Sortcolumn from '../../components/SortColumn';
import CmsTable from '../../pages/CmsManagement/CmsTable';
import CmsFilter from './CmsFilter';

class CmsManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userdata: [],
      alldata: [],
      page: 1,
      pageSize: 5,
      sort: { "metaKeyword": 1 },
      checked: false,
      selectedIds: null,
      column: null,
      direction: 'desc',
      allIds: [],
      show: false,
      items: [],
      current: 1,
      search: "",
      total:null, 
    };
  }


  componentWillMount() {
    this.getallcms();
  }

  getallcms() {
    var self = this;
    let access_token = this.props.token;
    let { page, pageSize,sort} = this.state;

    try {
      var body = { page: page, pagesize: pageSize, sort:sort };
      this.props.cmslist(body, access_token, (response) => {
        let { data } = response;
        if (data.status == 1) {
          self.setState({ error: null, alldata: data.data,total:data.total })
          console.log(this.state.total)
          console.log("all  cms  data ", this.state.alldata)
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

  applyFilter(value, id) {
    console.log('value is ', value)
    console.log('id is ', id)
    var self = this;
    var filterarray = [];
    let access_token = this.props.token;
    let { page, pageSize, } = this.state;
    value[id].map((data, Key) => {
      return filterarray.push(data.label)
    })
    console.log('filterarray is ', filterarray)
    try {
      var body = { page: page, pagesize: pageSize, filter: { [id]: filterarray } };
      this.props.cmslist(body, access_token, (response) => {
        let { data } = response;
        console.log(data)
        if (data.status == 1) {
          self.setState({ error: null, alldata: data.data, status: data.data.status, total: data.total })
          console.log("all data ", this.state.alldata)
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

 cancelFilter() {
  var self = this;
  let access_token = this.props.token;
  let { page, pageSize, } = this.state;
  try {
    var body = { page: page, pagesize: pageSize };
    this.props.cmslist(body, access_token, (response) => {
      let { data } = response;
      console.log(data)
      if (data.status == 1) {
        self.setState({ error: null, alldata: data.data, status: data.data.status, total: data.total })
        console.log("all data ", this.state.alldata)
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

changeCoulmn(Key, name) {
    console.log(name)
    var columnId = []
    this.state.Columnelement.map((data, Key) => {
      columnId.push(data.column)
    });
    console.log(columnId)
    if (!columnId.includes(name)) {
      this.state.Columnelement.push(name);
    }
    else {
      this.state.Columnelement.splice(this.state.Columnelement.indexOf(name), 1);
    }
    console.log(this.state.Columnelement)
  }

paginationChange = (page, pageSize) => {
    var self = this;
    console.log(page);
    this.setState({
      page: page,
      pageSize: pageSize
    }, () => {
      self.getalluser()
    });
  }

Deleteselectedbox(userIds) {
    console.log('userids are ', userIds);
    var self = this;
    var udata = {
      cid:userIds
    }
    var access_token = this.props.token;
    console.log(udata)
    this.props.deleteCmslist(udata, access_token, (response) => {
      let { data } = response;
      if (data.status == 1) {
        console.log("here")
        swal("All user deleted successful"); ``
        console.log(this.state.userdata);
        this.getallcms();
        }
      else {
        swal(data.message, '', 'error');
      }
    }).catch(error => {
      return error;
    });
  }



  handleChangePageSize = (value) => {
    console.log("selected", value);
    this.setState({ pageSize: value, page: 1 }, () => {
      this.getallcms()
    });
  }

  sortChange = (element,value) => {
    console.log(" 168 sortchange",element,value)
    var self = this;
    console.log(element);
    this.setState({
     sort:{[element]:value}
    }, () => {
      self.getallcms()
    });
  }


  DeleteAllbox(userdata) {
    var delIdarray = [];
    var checked = true;
    var self = this;
    userdata.map((dynamicData, Key) => {
      delIdarray.push(dynamicData._id);
    }
    )
  if (this.state.checked) {
      delIdarray = [];
      checked = false;
    }
    else {
      checked = true;
    }
    this.setState({ allIdToDel: delIdarray, checked: checked }, () => {
      console.log('all id are ', this.state.allIdToDel)
    });
 }


  userstatusChange(status, userId) {
    console.log('came here .. ', status, 'userid is ', userId);
    var status = !status;
    let access_token = this.props.token;
    var self = this;
    try {
      var udata = {
        userIds: userId,
        status: status
      }
      console.log('data ', JSON.stringify(udata));
      this.props.statuslist(udata, access_token, (response) => {
        console.log(access_token);
        let { data } = response;
        if (data.status == 1) {
          console.log("here")
          self.setState({ error: null, userdata: data.data })
          swal("status changed data successful");
          console.log(this.state.userdata);
          // self.props.history.push("/dashboard")
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

  deleteCms(_id) {
    console.log('data ', _id);
    let access_token = this.props.token;
    var self = this;
    try {
      var udata = {
        cid: [_id]
      }
      console.log('data ', JSON.stringify(udata));
      this.props.deleteCmslist(udata, access_token, (response) => {
        console.log(access_token);
        let { data } = response;
        if (data.status == 1) {
          swal("cms 1 deleted successful")
        // self.setState({ error: null, userdata: data.data })
          this.getallcms();
         
          // self.props.history.push("/dashboard")
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

  showModal = () => {
    console.log(this.state.show)
    this.setState({ show: !this.state.show });
    console.log(this.state.show)
  };

  flagchange = () => {
    console.log(this.state.flag);
    this.setState({ flag: !this.state.flag });
  };


  render() {

    const { val } = this.state;
    const options = [this.state.userdata];
    let access_token = this.props.token;
    const Option = Select.Option;

    return (

      <Home>
        <div>
          <div className="row">
            <div className="col-md-4">
              <h3>CMS Management</h3>
            </div>
            <div className="col-md-8">
              <div className="button-continer text-right">
                <button type="button" className="btn btn-primary" onClick={() => this.props.history.push('/newcms')}><i className="mdi mdi-plus" /> Add User</button>
              </div>
            </div>
          </div>
          <hr />
          {/* Data table start */}
          <div className="animated fadeInUp">
            <div className="row">
              <div className="col-md-12">
                <div>
                  <a className="nav-link pull-right" aria-controls="filterBlock" onClick={this.showModal}>
                    <i className="fa fa-filter" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <CmsFilter show={this.state.show} dataTofilter={this.state.userdata} access_token={this.props.token} applyFilter={this.applyFilter.bind(this)}  cancelFilter={this.cancelFilter.bind(this)}/>
            </div>
            <div>
              <CmsTable columnElement={["title","pageId","UpdateId","createdAt"]} sortChange={this.sortChange.bind(this)} userdata={this.state.alldata} Deleteselectedbox={this.Deleteselectedbox.bind(this)} userstatusChange={this.userstatusChange.bind(this)} deleteCms={this.deleteCms.bind(this)} />
              <p style={{ fontSize: 20, color: "black", float: "left", marginTop: 15 }}>Total Items: {this.state.total} </p>
              <div style={{ margin: 15, textAlign: "center" }}>
                <Select
                  showSearch
                  style={{ width: 200, color: "black" }}
                  placeholder={<b>Items Per Page</b>}
                  optionFilterProp="children"
                  onSelect={this.handleChangePageSize.bind(this)}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                >
                  <Option value={5}>5</Option>
                  <Option value={10}>10</Option>
                  <Option value={15}>15</Option>

                </Select>

                <div style={{ marginRight: 30, float: "right", marginBottom: 100 }}>
                  <Pagination className="ant-pagination" pageSize={this.state.pageSize}
                    current={this.state.page} total={this.state.total} onChange={this.paginationChange.bind(this)} />
                </div>

              </div>
            </div>

          </div>
        </div>
      </Home >

    );
  }
}





const mapStateToProps = state => ({
  token: state.admin.user.access_token,
  // total: state.admin.userList.data.total
});


export default withRouter(connect(mapStateToProps, actions)(CmsManagement));
