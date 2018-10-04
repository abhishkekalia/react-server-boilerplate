
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import * as actions from '../actions';
import swal from 'sweetalert';

const Option = Select.Option;

class FilterData extends React.Component {
    constructor(props) {
        super(props);
        this.lastFetchId = 0;
        this.fetchUser = debounce(this.fetchUser, 800);
    }

    state = {
        selectUsers:[],
        selectList: [],
        filterType:"",
        fetching: false,
    }

    fetchUser = (id, value) => {
        console.log('id is ', id);
        this.setState({ filterType: id })
        const filter = {
            "filter": {
                [id]: value
            }
        }
     
    
        var access_token = this.props.access_token;
        console.log(this.lastFetchId)
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
   //     this.setState({ selectList: [], fetching: true });
        this.props.searchdata(filter, access_token, (response) => {
            let { data } = response;
            console.log('qwwee',data);

            const userData = data.data[id].map(user => ({
                text: user,
                value: user
            }));
           
            let selectList = this.state.selectList;
            selectList[id] = userData;
            console.log("data1.....", selectList)
            this.setState({ selectList: selectList, fetching: false })
          }
        ).catch(error => {
            return error;
        });

    }

    handleChange = (value,type) => {
        console.log('type is  ', this.state.filterType);
        var selectUsers = this.state.selectUsers;
        selectUsers[this.state.filterType]= value;
        console.log('value in handle change', selectUsers);
        this.setState({
            selectUsers:selectUsers,
            fetching: false,
        });
    }

  render() {

        const { fetching, selectList,selectUsers, filterType} = this.state;
       
        return (
             <div>
                 
                {(this.props.show == true) ? (
                    <div id="filterBlock" className="filter-block animated fadeInDown">
                        <form>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group row">
                                        <div className="col-3">
                                            <label>First Name </label>
                                            <Select
                                                mode="multiple"
                                                labelInValue
                                                value={selectUsers.firstname}
                                                placeholder="Select users"
                                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                                filterOption={false}
                                                onSearch={this.fetchUser.bind(this,"firstname")}
                                                onChange={this.handleChange.bind(this)}
                                                style={{ width: '100%' }}
                                            >
                                                {
                                                   ( selectList.firstname)? (
                                                       selectList.firstname.map(d => <Option key={d.value}>{d.text}</Option>)
                                                   ):(null) 
                                                }
                                            </Select>
                                        </div>

                                        <div className="col-3">
                                            <label>EmailId </label>
                                            <Select
                                                 mode="multiple"
                                                labelInValue
                                                value={selectUsers.emailId}
                                                placeholder="Select users"
                                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                                filterOption={false}
                                                onSearch={this.fetchUser.bind(this, "emailId")}
                                                onChange={this.handleChange.bind(this)}
                                                style={{ width: '100%' }}
                                            >
                                            {
                                                  ( selectList.emailId)?(
                                                    selectList.emailId.map(d => <Option key={d.value}>{d.text}</Option>)
                                                  ):(null)
                                            }
                                            
                                            </Select>
                                          </div> 
                                 
                                          <div className="col-3">
                                            <label>Lastname </label>
                                            <Select
                                                mode="multiple"
                                                labelInValue
                                                value={selectUsers.lastname}
                                                placeholder="Select users"
                                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                                filterOption={false}
                                                onSearch={this.fetchUser.bind(this,"lastname")}
                                                onChange={this.handleChange.bind(this)}
                                                style={{ width: '100%' }}
                                            >
                                             {
                                                  ( selectList.lastname)?(
                                                      selectList.lastname.map(d => <Option key={d.value}>{d.text}</Option>)
                                                  ):(null)
                                            }
                                            </Select>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-12 button-continer" style={{ marginBottom: 20 }}>
                                    <button type="button" className="btn btn-primary pull-right" 
                                    onClick={() => { this.props.applyFilter(selectUsers,filterType) }} >Apply Filter</button>
                                    <button type="button" className="btn btn-warning pull-right" 
                                    onClick={() => { this.props.applyFilter(selectUsers,filterType) }}>Reset Filter</button>
                                </div>
                            </div>
                        </form>
                    </div>) : (<div> </div>)
                }
            </div>
        );
    }
}



const mapStateToProps = state => ({
    token: state.admin.user.access_token
});


export default withRouter(connect(mapStateToProps, actions)(FilterData));