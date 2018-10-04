
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
        id:"",
        value:[],
        data: [],
        FieldKey:"",
        valuefname:[],
        valuelname:[],
        fetching: false,
    }

    fetchUser = (id, value) => {
        console.log(id);
        const filter = {
            "filter": {
                [id]: value
            }
        }
        console.log('value is ', value);
        var access_token = this.props.access_token;
        console.log(this.lastFetchId)
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({ data: [], fetching: true });
        this.props.searchdata(filter, access_token, (response) => {
            let { data } = response;
            console.log('qwwee',data);
             const userData = data.data[id].map(user => ({
                text: user,
                value: user,
            }));
            console.log("data1.....", data.data[id])
            this.setState({ data: userData, fetching: false })
          }
        ).catch(error => {
            return error;
        });

    }

    handleChangefirstname = (value) => {
        this.setState({ value: null })
        console.log('value in handle change', value);
        this.setState({
            value:value,
            data: [],
            fetching: false,
        });
    }


  render() {

       console.log(this.state.value)
        const { fetching, data,value} = this.state;
        var id;
       
       
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
                                                value={value}
                                                placeholder="Select users"
                                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                                filterOption={false}
                                                onSearch={this.fetchUser.bind(this,id="firstname")}
                                                onChange={this.handleChangefirstname.bind(this)}
                                                style={{ width: '100%' }}
                                            >
                                                {data.map(d => <Option key={d.value}>{d.text}</Option>)}
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-12 button-continer" style={{ marginBottom: 20 }}>
                                    <button type="button" className="btn btn-primary pull-right" 
                                    onClick={() => { this.props.applyFilter(value,id) }} >Apply Filter</button>
                                    <button type="button" className="btn btn-warning pull-right" 
                                    onClick={() => { this.props.applyFilter(value,this.state.id) }}>Reset Filter</button>
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
    token: state.admin.user.access_token,
    total: state.admin.userList.data.total,
});


export default withRouter(connect(mapStateToProps, actions)(FilterData));