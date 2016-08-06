import React from 'react'
import {connect} from 'react-redux'
import {logColumns} from '../constant/model.js'
import Select from 'rc-select'
import Pagination from 'rc-pagination'
import Table from 'rc-table'
import {get_log} from '../action/log.js'
import 'rc-pagination/assets/index.css'
import 'rc-select/assets/index.css'

var SysLog = React.createClass({

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
        dispatch(get_log(1, pageSize, startDate.value, endDate.value, search.value));
    },

    onPageChange: function (page) {
        let {startDate, endDate, search} = this.refs;
        let {dispatch,pageSize} = this.props;
        dispatch(get_log(page,pageSize,startDate.value, endDate.value, search.value));
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
                    <div className="form-group">
                        <input ref="search" type="text" className="form-control compact-inline" placeholder="搜索操作用户,模块,操作内容"/>
                    </div>
                    <button type="button" className="btn btn-default" onClick={this.refreshData}>查询</button>
                </form>
                <Table className="table table-bordered compact-3"
                       columns={logColumns}
                       data={this.props.data.map((e,index) => Object.assign({}, e, {key: index}))}
                       style={{width: '80%'}}/>
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