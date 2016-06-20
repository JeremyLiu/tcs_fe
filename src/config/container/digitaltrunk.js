import React from 'react'
import Table from 'rc-table'

const columns = [
    {
        key: "name",
        title: "名称",
        dataIndex: "name",
        width: 100
    },
    {
        key: "address",
        title: "地址",
        dataIndex: "address",
        width: 150
    },
    {
        key: "port",
        title: "端口",
        dataIndex: "port",
        width: 50
    }
];

const data = [
    {
        key: 1,
        name: "DPC",
        address: "192.2.2",
        port: 1
    },
    {
        key:2,
        name: "OPC",
        address: "23.4.5",
        port: 2
    },
    {
        key:3,
        name: "CIC",
        address: "1.2.3",
        port: 3
    }
];

var DigitalTrunk = React.createClass({

    render(){
        return <Table className="table table-bordered compact-3"
               columns={columns}
               data={data}
               style={{
                width: 600
            }}/>
    }
});

export default DigitalTrunk;