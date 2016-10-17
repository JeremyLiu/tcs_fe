import React from 'react'
import {connect} from 'react-redux'
import {logColumns ,noDataText} from '../constant/model.js'
import Select from 'rc-select'
import Pagination from 'rc-pagination'
import Table from 'rc-table'
import TimeShortcut from '../common/component/timeshortcut.js'
import {get_log, remove_log} from '../action/log.js'
import {open_confirm_dialog, close_confimr_dialog} from '../action/config.js'
import 'rc-pagination/assets/index.css'
import 'rc-select/assets/index.css'

var SysLog = React.createClass({

    getInitialState(){
        return {
            select : []
        }
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

    onShowSizeChange: function(current, pageSize){
        if(current != pageSize){
            let {startDate, endDate, search} = this.refs;
            let {dispatch, page} = this.props;
            dispatch(get_log(page, pageSize, startDate.value, endDate.value, search.value));
        }
    },

    refreshData(){
        let {startDate, endDate, search} = this.refs;
        let {dispatch, pageSize} = this.props;
        this.setState({select:[]});
        dispatch(get_log(1, pageSize, startDate.value, endDate.value, search.value));
    },

    onPageChange: function (page) {
        let {startDate, endDate, search} = this.refs;
        let {dispatch,pageSize} = this.props;
        dispatch(get_log(page,pageSize,startDate.value, endDate.value, search.value));
    },

    handleCheck(event){
        let id = event.target.value;
        if(event.target.checked){
            this.setState({
                select: [...this.state.select, id]
            })
        }else
            this.setState({
                select: this.state.select.filter(e => e!=id)
            });
    },

    handleRemove(e){
        let {dispatch, page, pageSize} = this.props;
        dispatch(open_confirm_dialog('删除日志', '确定要删除所选日志?', ()=>{
            dispatch(remove_log(this.state.select, (data) =>{
                if(data.status == 0){
                    let nextPage = page;
                    if(this.state.select.length == pageSize)
                        nextPage -= 1;
                    dispatch(get_log(nextPage, pageSize));
                    dispatch(close_confimr_dialog());
                }
            }))
        }))
    },

    handleTimeShortcut(d){
        let {search} = this.refs;
        let {dispatch, page, pageSize} = this.props;
        dispatch(get_log(page, pageSize, d, '', search.value));
    },

    render: function () {
        return(
            <div>
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
                        <input ref="search" type="text" className="form-control compact-inline" placeholder="搜索操作用户,模块,操作内容"/>
                    </div>
                    <button type="button" className="btn btn-default" onClick={this.refreshData}>查询</button>
                    <button type="button" className="compact-inline btn btn-default" disabled={this.state.select.length==0} onClick={this.handleRemove}>删除</button>
                </form>
                <Table className="table table-bordered compact-3"
                       columns={[
                           {
                            dataIndex: "id",
                            width: 50,
                            render: (value, row, index) => <input type="checkbox" value={value} onChange={this.handleCheck}/>
                        },
                       ...logColumns]}
                       data={this.props.data.map((e,index) => Object.assign({}, e, {key: index}))}
                       style={{width: '80%'}} emptyText={noDataText}/>
                <Pagination
                    selectComponentClass={Select}
                    showTotal={(total) => `一共 ${total} 条数据`}
                    pageSizeOptions={['10','20','50','100']}
                    showQuickJumper showSizeChanger
                    defaultPageSize={this.props.pageSize}
                    current={this.props.page}
                    onChange={this.onPageChange}
                    onShowSizeChange={this.onShowSizeChange} total={this.props.totalCount} />,
            </div>
        );
    }
});

function stateMap(state){
    return state.log;
}

export default connect(stateMap)(SysLog);