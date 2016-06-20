import React from 'react'
import Table from 'rc-table'

const columns = [
    {
        render: () => <input type="checkbox" />,
        width:30
    },
    {
        key: "id",
        title: "序号",
        dataIndex: "id",
        width: 40
    },
    {
        key: "calling_number",
        title: "主叫号码",
        dataIndex: "calling_number",
        width: 120
    },
    {
        key: "called_number",
        title: "被叫号码",
        dataIndex: "called_number",
        width: 120
    },
    {
        key: "create_time",
        title: "录音开始时间",
        dataIndex: "create_time",
        width: 150
    },
    {
        key: "time",
        title: "时长",
        dataIndex: "time",
        width: 80
    }
];

const data = [
    {
        key: 1,
        id: 1,
        calling_number: "1234567890",
        called_number: "1234567890",
        create_time: "2016-01-01 10:00:00",
        time: "20分钟"
    },
    {
        key: 2,
        id: 2,
        calling_number: "1234567890",
        called_number: "1234567890",
        create_time: "2016-01-01 10:00:00",
        time: "20分钟"
    }
];

var Record = React.createClass({

    componentDidMount(){
        $('.form-date').datepicker({
            format : "yyyy-mm-dd",
            language : "zh-CN",
            autoclose : true,
            clearBtn : true,
            todayHighlight : true
        });
    },

    render(){
        return <div>
            <div className="row" style={{marginLeft: 30}}>
                <div className="select-group">
                    <label className="label-text">日期范围：</label>
                    <div className="">
                        <input type="text" readonly="readonly" maxlength="20" className="n_input_text form-date"
                               defautValue="" />
                        <span className="label-text">至</span>
                        <input type="text" readonly="readonly" maxlength="20" className="n_input_text form-date"
                               defautValue="" />
                    </div>
                </div>
                <div className="select-group">
                    <input type="text" className="n_input_text" placeholder="输入主叫/被叫号码查询"/>
                    <button type="button" className="btn btn-default" style={{float: "left"}}>搜索</button>
                </div>
                <div className="select-group">
                    <button className="btn btn-default">删除</button>
                    <button className="btn btn-default">录音</button>
                </div>
            </div>
            <Table className="table table-bordered compact-3"
                columns={columns}
                data={data}/>
        </div>;
    }
});

export default Record;