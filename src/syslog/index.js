import React from 'react'

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

var SysLog = React.createClass({
    render: function () {
        return(
            <div></div>
        );
    }
});

export default SysLog;