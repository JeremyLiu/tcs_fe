import React from 'react'
import {connect} from 'react-redux'
import Table from 'rc-table'
import 'rc-table/assets/bordered.css'
import 'rc-table/assets/index.css'
import ConfigDialog from '../../common/component/configdialog.js'
import {configOperationMenu, noDataText} from '../../constant/model.js'
import OperationTrigger from '../../common/container/operationtrigger.js'
import {download_device_config, set_config_dialog_visible} from '../../action/config.js'
import notify from '../../common/component/notification.js'

var BaseDeviceConfig = React.createClass({

    getInitialState(){
        return {
            action: 'create',
            dialogVisible: false,
            downloadAction: 'init'
        }
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

        let {modifyAction, removeAction} = this.props;

        switch(event.key){
            case 'modify': modifyAction(row);this.openDialog('modify'); break;
            case 'remove': removeAction(row); break;
        }

    },

    handleDownload(){
        let {dispatch, configType, title, deviceNumber} = this.props;
        if(deviceNumber && deviceNumber!='') {
            this.setState({
                downloadAction: 'downloading'
            });
            dispatch(download_device_config(configType, 0, deviceNumber,
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

        let {title, model, columns, dialogVisible, saveAction,
            configDialogWidth, configDialogHeight, configType, returnClick} = this.props;
        let {action, downloadAction} = this.state;
        let visible = dialogVisible[configType];
        if(visible==undefined) visible = false;

        return<div style={this.props.style}>
            <div style={{marginLeft: 50, height: 20}}>
                <button style={{marginRight: 100}} className="btn btn-default left-float"
                        onClick={returnClick}>返回</button>
                <button className="btn btn-default left-float"
                        onClick={this.openDialog}>
                    新建终端{title}配置
                </button>
                <button style={{width:120}} className="btn btn-default left-float compact-inline"
                        disabled={downloadAction!='init'?'disabled':''}
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
            </div>
            <ConfigDialog width={configDialogWidth} height={configDialogHeight}
                          visible={visible}
                          title={(action == 'create'? "新建":"修改")+title+"配置"}
                          onSave={saveAction}
                          cancelAction={this.closeDialog}>
                <form className="form-horizontal">
                    {this.props.children}
                </form>
            </ConfigDialog>
        </div>
    }
});

BaseDeviceConfig.PropTypes = {
    configType: React.PropTypes.string,
    title: React.PropTypes.string,
    model: React.PropTypes.array,
    columns: React.PropTypes.array,
    configDialogWidth: React.PropTypes.number,
    configDialogHeight: React.PropTypes.number,
    saveAction: React.PropTypes.func,
    modifyAction: React.PropTypes.func,
    removeAction: React.PropTypes.func,
    downloadAction: React.PropTypes.func
};

function stateMap(state){
    return {
        dialogVisible: state.ui.configDialog
    }
}

export default connect(stateMap)(BaseDeviceConfig);