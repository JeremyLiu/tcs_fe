import React from 'react'
import Table from 'rc-table'
import {connect} from 'react-redux'
import {recordColumns, getTimeStr, recordMenu, noDataText} from '../constant/model.js'
import {fetch_record, play_record, remove_record, search_record_data} from '../action/network.js'
import {open_confirm_dialog} from '../action/config.js'
import Player from './player.js'
import OperationTrigger from '../common/container/operationtrigger.js'
import TimeShortcut from '../common/component/timeshortcut.js'

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

    handleSelect(row,event){
        let {dispatch} = this.props;
        switch(event.key){
            case 'play': dispatch(play_record(row.id)); break;
            case 'remove': dispatch(open_confirm_dialog('删除录音',
                '确定要删除该录音数据?',() => dispatch(remove_record(row.id))));
                break;
        }
    },

    search(){
        let {startDate, endDate, searchKey} = this.refs;
        let {dispatch} = this.props;
        dispatch(search_record_data(startDate.value, endDate.value, searchKey.value));
    },

    handleTimeShortcut(d){
        let {searchKey} = this.refs;
        let {dispatch} = this.props;
        dispatch(search_record_data(d, '', searchKey.value));
    },

    render(){
        return <div>
            <Player/>
            <form className="form-inline" style={{marginLeft: 30}}>
                <div className="form-group">
                    <label>日期范围：</label>

                    <input ref="startDate" type="text" readonly="readonly" maxlength="20"
                           className="form-control form-date compact-inline"
                           defautValue="" />
                    <label>至</label>
                    <input ref="endDate" type="text" readonly="readonly" maxlength="20"
                           className="form-control form-date compact-inline"
                           defautValue="" />
                </div>
                <TimeShortcut onChange={this.handleTimeShortcut}/>
                <div className="form-group">
                    <input ref="searchKey" type="text" className="form-control compact-inline" placeholder="输入主叫/被叫号码查询"/>
                </div>
                <button type="button" className="btn btn-default" onClick={this.search}>查询</button>
            </form>
            <Table className="table table-bordered compact-3"
                columns={[
                    ...recordColumns,
                    {
                        key: 'operation',
                        width: 150,
                        render: (value, row, index) => <OperationTrigger row={row} menu={recordMenu} handleSelect={this.handleSelect}/>
                    }
                ]}
                data={[
                    ...this.props.current,
                    ...this.props.history
                ]} style={{width: '80%'}} emptyText={noDataText}/>
        </div>;
    }
});

function stateMap(state){
    let itemMap = (e,index) => {
        return Object.assign({},e,{
            key: index,
            startTime: e.startTime,
            period: getTimeStr(e.period)
        })
    };
    return {
        current: state.record.current.map(itemMap),
        history: state.record.history.map(itemMap)
    }
}

export default connect(stateMap)(Record);