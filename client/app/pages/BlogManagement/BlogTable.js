import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import "bootstrap-less";
import { connect } from "react-redux";
import { Select, Option } from 'antd';
import 'antd/dist/antd.css';
import ReactFileReader from 'react-file-reader';
import 'rc-pagination/assets/index.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import Pagination from 'rc-pagination';
import Toggle from 'react-toggle';
import swal from 'sweetalert';
import user from '../../reducers/user';
import * as actions from '../../actions';


class BlogTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userdata: [],
      page: 1,
      pageSize: 5,
      sort: { "metaKeyword": 1 },
      checked: false,
      selectedIds: null,
      column: null,
      direction: 'desc',
      allIdToDel: [],
      show: false,
      items: [],
      current: 1,
      search: "",
      flag: false,
      total: 1,
      arrowDirection: "",
      sortData: {blogContent:false,blogTitle:false,metaTitle:false,metaKeyword:false},
      Columnelement: [{ column: "blogContent" }, { column: "blogTitle" }, { column: "metaTitle" }, {column:"metaKeyword"}]

    };
  }


  componentWillReceiveProps(nextProps) {
    let { userdata } = nextProps;
    console.log("49", nextProps)
    this.setState({ userdata });
  }

  onSort = (column) => {
    console.log('column is  ', column);
    let { sortData } = this.state;
    var element, value;
    for (const key in sortData) {
      if (key == column) {
        sortData[key] = !sortData[key];
        console.log(sortData[key])
        element = key;
        value = -1
        if (sortData[key]) {
          value = 1
        }
        this.props.sortChange(element, value)
        console.log(element)
        console.log(value)
      }
      else {
        sortData[key] = false
        element = key;
        value = 1;
      }
    }
    console.log('sortData is', sortData);
    this.setState({ sortData });
    console.log('new sortData is', sortData);
  }

  handleEdit(dynamicData) {
    console.log('data ' + (dynamicData.userId));
    let access_token = this.props.token;
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


  editBloglist(dynamicData ) {
    var self = this;
    let udata = dynamicData;
    const access_token = this.props.token
    console.log("Edit Data is" + dynamicData);
    this.props.editCms(udata, access_token);
    this.props.history.push('/editblog')
  }



  // csvUpload({ files }) {
  //   const filename = files[0];
  //   var file = new FormData();
  //   file.append("csv", file);
  //   var access_token = this.props.token;
  //   console.log(access_token)
  //   console.log(file)
  //   this.props.csvUpload(file, access_token, (response) => {
  //     console.log(access_token);
  //     let { data } = response;
  //     if (data.status == 1) {
  //       console.log("here")
  //       swal("csv done");
  //       console.log(this.state.userdata);
  //     }
  //     else {
  //       swal(data.message, '', 'error');
  //     }
  //   }).catch(error => {
  //     return error;
  //   });
  // }

  onCheckbox(_id, val) {
    console.log(_id)
    var delarray = this.state.allIdToDel;
    if (!delarray.includes(_id)) {
      delarray.push(_id);
    }
    else {
      delarray.splice(delarray.indexOf(_id), 1);
    }
    if (delarray.length != this.state.userdata.length) {
      this.setState({ checked: false });
    }
    if (this)
      this.setState({ allIdToDel: delarray })
    console.log('1..' + this.state.allIdToDel)

  }



  DeleteAllbox(userdata, event) {
    console.log('checkbox val ', event.checked)
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



  checkArray(_id) {
    if (this.state.allIdToDel.includes(_id)) {
      return true;
    }
    else {
      return false;
    }
  }


  filterList(event) {
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function (item) {
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });


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

  handleBlur() {
    console.log('blur');
  }

  handleFocus() {
    console.log('focus');
  }
  render() {

    console.log("columnElement", this.props.columnElement)
    console.log(this.props.userdata)
    const Option = Select.Option;
    let { sortData, Coulmnsort } = this.state;
    const coulmnElement = this.props.columnElement;
    console.log(coulmnElement)


    return (
      <div className="animated fadeInUp">
        <div className="row">
          <div className="col-md-12">
            <div>
              {(this.state.allIdToDel.length > 0) ? (<div className="col-md-12"> <button type="button" className="btn btn-warning animated fadeIn" onClick={() => { this.props.Deleteselectedbox(this.state.allIdToDel) }} ><i className="mdi mdi-trash" /> Delete Selected</button></div>) :
                (<div> </div>)
              }
            </div>

            <div id="dropdown-triggers-manual" className="dropdown-menu" role="menu" aria-labelledby="button-triggers-manual" style={{ marginLeft: 100 }}>
              <table>
                <tbody>
                  {
                    this.state.Columnelement.map((data, Key) => {
                      return (
                        <tr key={Key}>
                          <td ><input type="checkbox" checked="true" onChange={this.changeCoulmn.bind(this, Key, data.column)} /></td>
                          <td  >{data.column}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>

          </div>
        </div>

        <div className="table-responsive">
          <table className="table dataTable with-image row-border hover custom-table" style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th width="5%">
                  <div className="form-check form-check-flat">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" id='deleteCheckbox' checked={this.state.checked} onChange={this.DeleteAllbox.bind(this, this.state.userdata)} />
                      <i className="input-helper" />
                    </label>
                  </div>
                </th>
                <th width="5%" />
                {
                  coulmnElement.map((data,Key) => {
                    return (
                      <th width="13%"  key={Key} sortable-column={data} onClick={this.onSort.bind(this, data)}>{data} <i aria-hidden="true" className={(sortData[data]) ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i></th>
                    )
                  })
                }
                <th width="10%"> Action</th>
              </tr>
            </thead>

            <tbody>

              {this.state.userdata.map((dynamicData, Key) => {
                return (
                  <tr key={dynamicData._id} style={{borderBottom: '1px solid red' }} className="animated fadeIn">
                    <td>
                      <div className="form-check form-check-flat">
                        <label className="form-check-label">
                          <input type="checkbox" className="form-check-input" name="foo" checked={(this.checkArray(dynamicData._id)) ? true : false} onClick={this.onCheckbox.bind(this, dynamicData._id)} />
                          <i className="input-helper" />
                        </label>
                      </div>
                    </td>
                    <td >
                    </td>
                    <td>{dynamicData.blogContent} </td>
                    <td>{dynamicData.blogTitle} </td>
                    <td>{dynamicData.metaTitle} </td>
                    <td>{dynamicData.metaKeyword} </td>
                    <td>
                      <button onClick={() => this.props.deleteCms(dynamicData._id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                      <button onClick={this.editBloglist.bind(this, dynamicData)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    </td>
                  </tr>

                );
              })
              }
            </tbody>

          </table>
        </div>
        {
          (!this.state.userdata) ? (<div className="record-not-found">
            <label className="label danger">No matches found!</label>
          </div>) : (<div> </div>)

        }

      </div>

    )

  }
}

const mapStateToProps = state => ({
  token: state.admin.user.access_token,
  total: state.admin.userList.data.total,
});

export default withRouter(connect(mapStateToProps, actions)(BlogTable));
