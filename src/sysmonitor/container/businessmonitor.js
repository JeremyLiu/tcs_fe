import React from 'react'
import {connect} from 'react-redux'
import Table from 'rc-table'
import 'rc-table/assets/index.css'

const columns = [
    {
        key: "id",
        title: "序号",
        dataIndex: "id",
        width: 50
    },
    {
        key: "type",
        title: "业务类型",
        dataIndex: "type",
        width: 200,
        render: (value, row, index) => <img src={row.type}/>
    },
    {
        key: "calling_number",
        title: "主叫号码",
        dataIndex: "calling_number",
        width: 150
    },
    {
        key: "called_number",
        title: "被叫号码",
        dataIndex: "called_number",
        width: 150
    }
];

const data = [
    {
        key:1,
        id: 1,
        type: "../img/business_type.png",
        calling_number: "123456789",
        called_number: "123456789"
    },
    {
        key:2,
        id:2,
        type: "../img/business_type.png",
        calling_number: "123456789",
        called_number: "123456789"
    }
];

var BusinessMonitor = React.createClass({
   render(){
       return (
            <Table className="table table-bordered compact-3"
                   columns={columns}
                   data={data}
                   style={{
                width: 600
            }}/>
       )
   }
});

function stateMap(state){
    return state.sysMonitor.businessRecord;
}

export default connect()(BusinessMonitor);
