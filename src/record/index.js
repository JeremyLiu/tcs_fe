import React from 'react'
import Table from 'rc-table'
import {connect} from 'react-redux'
import {recordColumns, dateFormat, getTimeStr} from '../constant/model.js'
import {fetch_record} from '../action/network.js'
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

    componentWillMount(){
        this.props.dispatch(fetch_record());
    },

    componentDidMount(){
        $('input.form-date').datepicker({
            format : "yyyy-mm-dd",
            language : "zh-CN",
            autoclose : true,
            clearBtn : true,
            todayHighlight : true
        });
    },

    render(){
        return <div>
            <form className="form-inline" style={{marginLeft: 30}}>
                <div className="form-group">
                    <label>日期范围：</label>

                    <input type="text" readonly="readonly" maxlength="20"
                           className="form-control form-date compact-inline"
                           defautValue="" />
                    <label>至</label>
                    <input type="text" readonly="readonly" maxlength="20"
                           className="form-control form-date compact-inline"
                           defautValue="" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control compact-inline" placeholder="输入主叫/被叫号码查询"/>
                </div>
                <button type="button" className="btn btn-default">查询</button>
            </form>
            <Table className="table table-bordered compact-3"
                columns={recordColumns}
                data={[
                    ...this.props.current,
                    ...this.props.history
                ]} style={{width: '80%'}}/>
        </div>;
    }
});

function stateMap(state){
    let itemMap = (e,index) => {
        return Object.assign({},e,{
            key: index,
            startTime: dateFormat(e.startTime),
            period: getTimeStr(e.period)
        })
    };
    return {
        current: state.record.current.map(itemMap),
        history: state.record.history.map(itemMap)
    }
}

export default connect(stateMap)(Record);