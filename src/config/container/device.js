import React, {PropTypes} from 'react'
import Table from 'rc-table'
import {connect} from 'react-redux'
import {fetch_device, fetch_device_port,
    open_device_dialog ,open_confirm_dialog,
        post_remove_device, open_device_port_dialog,
     post_remove_device_port} from '../../action/config.js'
import OperationTrigger from '../../common/container/operationtrigger.js'
import {deviceColumns, devicePortColumns,
    deviceMenu, devicePortMenu} from '../../constant/model.js'


var DeviceList = React.createClass({

    componentWillMount(){
      this.props.dispatch(fetch_device());
    },

    handleDeviceSelect (row,event){
        switch(event.key){
            case 'modify':
                this.props.dispatch(open_device_dialog('modify', row));
                break;
            case 'remove':
                this.props.dispatch(open_confirm_dialog('删除设备',
                    '确定要删除设备'+row.name+'及其配置么?',() => this.props.dispatch(post_remove_device(row.id,this.props.select))));
                break;
            case 'port':
                this.props.dispatch(open_device_port_dialog(row.id));
                break;
        }
    },

    handlePortSelect(row,event){
        switch(event.key){
            case 'modify':
                this.props.dispatch(open_device_port_dialog(this.props.select, 'modify', row));
                break;
            case 'remove':
                this.props.dispatch(open_confirm_dialog('删除设备端口',
                    '确定要删除端口号'+row.id+'么?',() => this.props.dispatch(post_remove_device_port(row.id))));
                break;
        }
    },

    render(){
        return (<div>
                    <div className="left-float" style={{marginLeft:30}}>
                        <div style={{marginBottom: 10}}>
                            <h4 className="left-float">设备列表</h4>
                            <button className="btn btn-default" onClick={() => this.props.dispatch(open_device_dialog())}>添加设备</button>
                        </div>
                        <Table className="table table-bordered"
                               columns={[
                                ...deviceColumns,
                                {
                                    key: 'operate',
                                    render: (value, row, index) => <OperationTrigger row={row} menu={deviceMenu} handleSelect={this.handleDeviceSelect}/>
                                }
                               ]}
                               data={this.props.device.map((e, index) => {
                                    e.key = index;
                                    return e;
                               })}
                               onRowClick={(record,index)=> this.props.dispatch(fetch_device_port(record.id))}/>
                    </div>
                    <div className="left-float" style={{marginLeft: 50}}>
                        <h4>端口列表</h4>
                        <Table className="table table-bordered"
                               columns={[
                               ...devicePortColumns,
                               {
                                key: 'operate',
                                render: (value, row, index) => <OperationTrigger row={row} menu={devicePortMenu} handleSelect={this.handlePortSelect}/>
                               }
                               ]}
                               data={this.props.ports.map((e, index) => {
                                    e.key = index;
                                    return e;
                               })}/>
                    </div>
                </div>);
    }
});

DeviceList.PropTypes={
    ports: PropTypes.array.isRequired,
    device: PropTypes.array.isRequired
};

function stateMap(state){
    return {
        device: state.deviceConfig,
        ports: state.devicePort.ports,
        select: state.devicePort.device
    }
}

export default connect(stateMap)(DeviceList);