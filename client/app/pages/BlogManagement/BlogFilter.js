
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import * as actions from '../../actions';
import swal from 'sweetalert';

const Option = Select.Option;

class BlogFilter extends React.Component {
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
        sort: { "metaKeyword": 1 },
    }

    fetchUser = (id, value) => {
        console.log('id is ', id);
        console.log('id is ', value);
        this.setState({ filterType: id })
        const filter = {
            "filter": {
                [id]: value
            }
        }
        console.log(filter)
        var access_token = this.props.access_token;
        console.log(this.lastFetchId)
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
   //     this.setState({ selectList: [], fetching: true });
        this.props.searcBlogldata(filter, access_token, (response) => {
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
                                            <label>blogContent </label>
                                            <Select
                                                mode="multiple"
                                                labelInValue
                                                value={selectUsers.blogContent}
                                                placeholder="Select users"
                                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                                filterOption={false}
                                                onSearch={this.fetchUser.bind(this,"blogContent")}
                                                onChange={this.handleChange.bind(this)}
                                                style={{ width: '100%' }}
                                            >
                                                {
                                                   ( selectList.blogContent)? (
                                                       selectList.blogContent.map(d => <Option key={d.value}>{d.text}</Option>)
                                                   ):(null) 
                                                }
                                            </Select>
                                        </div>

                                        <div className="col-3">
                                            <label>blogTitle </label>
                                            <Select
                                                mode="multiple"
                                                labelInValue
                                                value={selectUsers.blogTitle}
                                                placeholder="Select users"
                                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                                filterOption={false}
                                                onSearch={this.fetchUser.bind(this, "blogTitle")}
                                                onChange={this.handleChange.bind(this)}
                                                style={{ width: '100%' }}
                                            >
                                            {
                                                  ( selectList.blogTitle)?(
                                                    selectList.blogTitle.map(d => <Option key={d.value}>{d.text}</Option>)
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
                                    onClick={() => { this.props.cancelFilter() }}>Reset Filter</button>
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


export default withRouter(connect(mapStateToProps, actions)(BlogFilter));