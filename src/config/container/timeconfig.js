import React from 'react'
import {connect} from 'react-redux'
import {Calendar, DateField} from 'react-date-picker'
import 'moment/locale/zh-cn.js'
import 'react-date-picker/index.css'
import Combox from '../../common/component/combox.js'
import {download_time} from '../../action/config.js'
import notify from '../../common/component/notification.js'

var TimeConfig = React.createClass({

    getInitialState(){
        return {
            downloadAction: 'init',
            checked: true,
            selectDownload: 'none',
            time: new Date().getTime()
        }
    },

    componentDidMount(){
        $('input.form-ui-datetime').datetimepicker({
            timeFormat: "HH:mm:ss",
            dateFormat: "yy-mm-dd",
            language : "zh-CN",
            autoclose : true,
            clearBtn : true,
            todayHighlight : true
        });
    },

    handleSelect(v){
        let select = 'none';
        if(v.value != undefined)
            select = v.value;
        this.setState({
            selectDownload: select
        })
    },

    handleChange(event){
        this.setState({
            checked: event.target.checked
        });
    },

    handleDownload(){
        if(this.state.selectDownload != 'none') {
            this.setState({
                downloadAction: 'downloading'
            });
            this.props.dispatch(download_time(
                this.state.selectDownload, this.state.time,
                (data) => {
                    if(data.status==0){
                        notify(title+"下载成功");
                    }else{
                        let msg = data.message;
                        if(msg == '') msg=title+'下载失败';
                        notify(msg, 5);
                    }
                    this.setState({
                        downloadAction: 'init'
                    })
                }));
        }
    },

    render(){
        let {downloadAction, selectDownload, checked, time} = this.state;

        let canDownloadNetunit = [];
        if(this.props.netunit.length>0)
            canDownloadNetunit = [{
                text: '全部',
                value: 0
                }, 
                ...this.props.netunit
            ];
        
        return <form className="form-inline compact-3" style={{minHeight: 600}}>
            <Combox className="left-float compact-inline" style={{width:120}} model={canDownloadNetunit}
                    defaultValue="选择要下载的网元" onSelect={this.handleSelect}/>
            <div className="form-group left-float compact-inline">
                <label>时间：</label>
                <DateField dateFormat="YYYY-MM-DD HH:mm:ss" value={time}
                           forceValidDate
                           updateOnDateClick
                           disabled={checked}>
                    <Calendar locale="zh-cn"
                              okButtonText="确定"
                              cancelButtonText="取消"
                              todayButtonText="今天"
                              clearButtonText="清空"
                              navigation
                              highlightWeekends
                              highlightToday
                              onChange={(dateString, { dateMoment, timestamp})=> this.setState({time:timestamp})}/>
                </DateField>
                <label className="compact-inline">当前系统时间</label>
                <input type="checkbox" onChange={this.handleChange} checked={checked? 'checked': ''}/>
            </div>
            <button type="button" style={{width:120}} className="btn btn-default left-float compact-inline"
                    disabled={selectDownload=='none'?'disabled':''}
                    onClick={this.handleDownload}>{downloadAction=='init'?'下载':'正在下载'}</button>

        </form>
    }
});

function stateMap(state){
    let netunit = state.netUnitConfig.device.map(e => {
        return {
            value: e.id,
            text: e.name
        }
    });

    return {
        netunit: netunit
    }
}

export default connect(stateMap)(TimeConfig);