import React from 'react'
import {connect} from 'react-redux'
import Table from 'rc-table'
import Select from 'rc-select'
import Pagination from 'rc-pagination'
import 'rc-table/assets/bordered.css'
import 'rc-table/assets/index.css'
import ConfigDialog from '../../common/component/configdialog.js'
import Combox from '../../common/component/combox.js'
import {configOperationMenu, noDataText} from '../../constant/model.js'
import OperationTrigger from '../../common/container/operationtrigger.js'
import {download_config, set_config_dialog_visible, get_outline_config} from '../../action/config.js'
import notify from '../../common/component/notification.js'

var BaseConfig = React.createClass({

    getInitialState(){
        return {
            action: 'create',
            dialogVisible: false,
            selectDownload: 'none',
            downloadAction: 'init',
            pageSize: 20,
            page: 1,
            totalCount: 0
        }
    },

    componentWillMount(){
        let {dispatch, configType} = this.props;
        let {page, pageSize}= this.state;
        dispatch(get_outline_config(configType, page, pageSize, totalCount=>{
            this.setState({
                pageSize: pageSize,
                totalCount: totalCount
            })
        }));
    },

    openDialog(action='create'){
        if(action=='create' && this.props.addAction)
            this.props.addAction();
        this.setState({
            action: action
        });
        this.props.dispatch(set_config_dialog_visible(this.props.configType, true));
    },

    closeDialog(){
        let {configType, dispatch} = this.props;
        return dispatch(set_config_dialog_visible(configType, false));
    },

    handleSelect(row,event){

        let {modifyAction, removeAction, downloadAction} = this.props;

        switch(event.key){
            case 'modify': modifyAction(row);this.openDialog('modify'); break;
            case 'remove': removeAction(row); break;
            case 'download': downloadAction(row); break;
        }

    },

    handleSave(){
        let {saveAction} = this.props;
        let {netunit} = this.refs;
        saveAction(netunit.getSelect());
    },

    handleSelectDownload(v){
        let select = 'none';
        if(v.value != undefined)
            select = v.value;
        this.setState({
            selectDownload: select
        })
    },

    handleDownload(){
        let {dispatch, configType, title} = this.props;
        if(this.state.selectDownload != 'none') {
            this.setState({
                downloadAction: 'downloading'
            });
            dispatch(download_config(configType, this.state.selectDownload,
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

    onShowSizeChange(current, pageSize){
        if(current != pageSize){
            let {dispatch, configType} = this.props;
            let {page}= this.state;
            dispatch(get_outline_config(configType, page, pageSize, totalCount=>{
                this.setState({
                    pageSize: pageSize,
                    totalCount: totalCount
                })
            }));
        }
    },

    onPageChange(page){
        if(page!=this.state.page){
            let {dispatch, configType} = this.props;
            dispatch(get_outline_config(configType, page, this.state.pageSize, totalCount=>{
                this.setState({
                    page: page,
                    pageSize: this.state.pageSize,
                    totalCount: totalCount
                })
            }));
        }
    },

    render(){

        let {title, netunit, model, columns, defaultNetunit, dialogVisible,
            configDialogWidth, configDialogHeight, selectNetunit, configType} = this.props;
        let {action, downloadAction, selectDownload, page, pageSize, totalCount} = this.state;

        let canCreateNetUnit = netunit.filter(e => {
            let index = model.findIndex(m => m.netunit == e.value);
            return index < 0;
        });
        let visible = dialogVisible[configType];
        if(visible==undefined) visible = false;

        let canDownloadNetunit = [];
        let configNetunit= netunit.filter(e=>model.findIndex(m => m.netunitId==e.value) >= 0);
        if(configNetunit.length>0)
            canDownloadNetunit = [
                {
                    text: '全部',
                    value: 0
                },
                ...configNetunit
            ];

        if(!defaultNetunit || defaultNetunit=='')
            defaultNetunit='选择网元';
        return<div style={this.props.style}>
            <div style={{marginLeft: 150, height: 20}}>
                <button className="btn btn-default left-float" disabled={canCreateNetUnit.length == 0}
                        onClick={()=>this.openDialog()}>
                    新建{title}配置
                </button>
                <Combox className="left-float compact-inline" style={{width:120}} model={canDownloadNetunit}
                        defaultValue="选择要下载的网元" onSelect={this.handleSelectDownload}/>
                <button style={{width:120}} className="btn btn-default left-float compact-inline"
                        disabled={(selectDownload=='none' || downloadAction!='init')?'disabled':''}
                        onClick={this.handleDownload}>{downloadAction=='init'?'下载':'正在下载'}</button>
            </div>
            <div>
                <Table className="table table-bordered compact-3 bordered"
                       columns={
                        [
                            ...columns,
                            {
                                key: 'operate',
                                render: (value, row, index) =>
                                <OperationTrigger row={row} menu={configOperationMenu}
                                handleSelect={this.handleSelect}/>
                            }
                        ]
                       }
                       data={model.map((e,index) =>{
                            return Object.assign({}, e, {
                                key: index
                            })
                       })}
                       emptyText={noDataText}
                />
                <Pagination
                    selectComponentClass={Select}
                    showTotal={(total) => `一共 ${total} 条数据`}
                    pageSizeOptions={['10','20','50','100']}
                    showQuickJumper showSizeChanger
                    defaultPageSize={pageSize}
                    current={page}
                    onChange={this.onPageChange}
                    onShowSizeChange={this.onShowSizeChange} total={totalCount} />
            </div>
            <ConfigDialog width={configDialogWidth} height={configDialogHeight}
                visible={visible}
                title={(action == 'create'? "新建":"修改")+title+"配置"}
                onSave={this.handleSave}
                cancelAction={this.closeDialog}>
              <form className="form-horizontal">
                    <div className="form-group">
                        <label className="label-4">网元</label>
                        <Combox ref="netunit" className="left-float"
                                style={{width:120}} disable={action=='modify'}
                                defaultValue={defaultNetunit} model={canCreateNetUnit}
                                onSelect={selectNetunit}/>
                    </div>
                    {this.props.children}
              </form>
            </ConfigDialog>
        </div>
    }
});

BaseConfig.PropTypes = {
    configType: React.PropTypes.string,
    title: React.PropTypes.string,
    netunit: React.PropTypes.array,
    model: React.PropTypes.array,
    columns: React.PropTypes.array,
    configDialogWidth: React.PropTypes.number,
    configDialogHeight: React.PropTypes.number,
    selectNetunit: React.PropTypes.func,
    saveAction: React.PropTypes.func,
    modifyAction: React.PropTypes.func,
    removeAction: React.PropTypes.func,
    downloadAction: React.PropTypes.func
};

function stateMap(state){
    let netunit = state.netUnitConfig.device.map(e => {
        return {
            value: e.id,
            text: e.name
        }
    });

    return {
        dialogVisible: state.ui.configDialog,
        netunit: netunit
    }
}

export default connect(stateMap)(BaseConfig);