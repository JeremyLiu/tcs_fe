import React, {PropTypes} from 'react'
import Table from 'rc-table'
import Select,{Option} from 'rc-select'
import Combox from '../../common/component/combox.js'
import SwitchView from '../../common/component/switchview.js'
import UserDataSelect from '../../config/component/usernumberselect.js'
import {connect} from 'react-redux'
import {fetch_device, fetch_device_port,
    open_device_dialog ,open_confirm_dialog,
        post_remove_device, open_device_port_dialog,
     post_remove_device_port, save_terminal_business,
    save_terminal_keyconfig, get_terminal_business,
    get_terminal_keyconfig} from '../../action/config.js'
import OperationTrigger from '../../common/container/operationtrigger.js'
import BaseDeviceConfig from '../component/basedeviceconfig.js'
import {deviceColumns, devicePortColumns, terminalBusinessColumn,
    deviceMenu, devicePortMenu, terminalKeyColumn, noDataText, NOP} from '../../constant/model.js'
import {terminalBusinessTypeArray, terminalKeyBusinessTypeArray,
    keyTypeStateArray, userLevelArray} from '../../constant/enumerate.js'

var DeviceList = React.createClass({

    getDefaultProps(){
        return {
            onDeviceSelect: NOP
        }
    },

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
            default: this.props.onDeviceSelect(row,event);
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
                               emptyText={noDataText}
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
                               })} emptyText={noDataText}/>
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

let DeviceListConfig =  connect(stateMap)(DeviceList);

var DeviceBusiness = React.createClass({

    getInitialState(){
        return {
            id: 0,
            keyConfigId: -1,
            type: 1,
            members: []
        }
    },

    componentWillReceiveProps(nextProps){
        if(nextProps.deviceNumber != this.props.deviceNumber
            && nextProps.deviceNumber && nextProps.deviceNumber!='') {
            this.props.dispatch(get_terminal_business(nextProps.deviceNumber));
            this.props.dispatch(get_terminal_keyconfig(nextProps.deviceNumber));
        }
    },

    getDefaultProps(){
        return {
            keyConfig: [],
            deviceNumber: ''
        }
    },

    saveAction(){
        let {id, keyConfigId, type, members} = this.state;
        let {deviceNumber, dispatch} = this.props;
        dispatch(save_terminal_business({
            id,
            keyConfigId,
            type,
            members: members.join('\n'),
            deviceNumber
        }))
    },

    addAction(){
        this.setState(this.getInitialState());
    },

    modifyAction(row){
        this.setState({
            id: row.id,
            keyConfigId: row.keyConfigId,
            type: row.type,
            members: row.members
        });
    },

    handleChange(prop,value){
        let newState = {};
        newState[prop] = value;
        this.setState(newState);
    },

    render(){
        let {members, keyConfigId, type} = this.state;
        let {model, keyConfig, deviceNumber, returnClick} = this.props;
        return <BaseDeviceConfig title="终端业务" configType="terminalbusiness"
                                 configDialogWidth="480" configDialogHeight="400"
                                 deviceNumber={deviceNumber} returnClick={returnClick}
                                 model={model} columns={terminalBusinessColumn}
                                 saveAction={this.saveAction} modifyAction={this.modifyAction}
                                 addAction={this.addAction} removeAction={this.removeAction}>
            <div className="form-group">
                <label className="label-4">按键</label>
                <Select
                    value={keyConfigId}
                    animation="slide-up"
                    choiceTransitionName="rc-select-selection__choice-zoom"
                    dropdownStyle={{maxHeight: 350, overflow: 'auto', zIndex: 1060, position:'absolute'}}
                    style={{width: 150,float:'left'}}
                    optionFilterProp="children"
                    optionLabelProp="children"
                    placeholder={keyConfig.length==0?'请先配置该终端按键':'点击选择'}
                    onChange={v=>this.handleChange('keyConfigId',v)}>
                    {keyConfig.map(e => <Option value={e.value}>{e.text}</Option>)}
                </Select>
            </div>
            <div className="form-group">
                <label className="label-4">业务类型</label>
                <Combox ref="netunit" className="left-float"
                        style={{width:120}}
                        defaultValue={type} model={terminalBusinessTypeArray}
                        onSelect={s=> this.handleChange('type', s.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">成员</label>
                <UserDataSelect placehoder="点击选择,不超过40个" style={{width: 250,float:'left'}}
                                value={members} filter={e=>e.userLevel==13}
                                onChange={v=>this.handleChange('members', v)}/>
            </div>
        </BaseDeviceConfig>
    }
});

let DeviceBusinessConfig = connect(state => {
    let model = state.outlineConfigs['terminalbusiness'];
    if(!model)
        model = [];
    let keyConfig=state.outlineConfigs['terminalkey'];
    if(!keyConfig)
        keyConfig = [];
    return {
        model: model.map(e => {
            return Object.assign({}, e, {
                membersText: e.members.join('\n')
            })
        }),
        keyConfig: keyConfig.map(e => {
            return {
                value: e.id,
                text: e.keyValue
            }
        })
    }
})(DeviceBusiness);

var DeviceKey = React.createClass({

    getInitialState(){
        return {
            name: '',
            code: '',
            keyValue: '',
            keyType: 0,
            businessType: 1,
            userLevel: 1
        }
    },

    componentWillReceiveProps(nextProps){
        if(nextProps.deviceNumber != this.props.deviceNumber
            && nextProps.deviceNumber && nextProps.deviceNumber!='')
            this.props.dispatch(get_terminal_keyconfig(nextProps.deviceNumber));
    },

    saveAction(){
        let {id, name, code, keyType,
            keyValue, businessType,userLevel} = this.state;
        let {deviceNumber, dispatch} = this.props;
        dispatch(save_terminal_keyconfig({
            id,
            name,
            code,
            keyType,
            keyValue,
            businessType,
            deviceNumber,
            userLevel
        }))
    },

    addAction(){
        this.setState(this.getInitialState());
    },

    modifyAction(row){
        this.setState({
            id: row.id,
            name: row.name,
            code: row.code,
            keyValue: row.keyValue,
            keyType: row.keyType,
            businessType: row.businessType,
            userLevel: row.userLevel
        });
    },


    handleChange(prop,value){
        let newState = {};
        newState[prop] = value;
        this.setState(newState);
    },

    render(){
        let {model, deviceNumber, returnClick} = this.props;
        let {name, code, keyValue, keyType, businessType, userLevel} = this.state;
        return <BaseDeviceConfig title="终端按键" configType="terminalkey"
                                 configDialogWidth="480" configDialogHeight="400"
                                 deviceNumber={deviceNumber} returnClick={returnClick}
                                 model={model} columns={terminalKeyColumn}
                                 saveAction={this.saveAction} modifyAction={this.modifyAction}
                                 addAction={this.addAction} removeAction={this.removeAction}>
            <div className="form-group">
                <label className="label-4">按键值</label>
                <input type="number" min="0" max="255" className="form-control"
                       value={keyValue} onChange={e=>this.handleChange('keyValue', e.target.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">按键类型</label>
                <Combox className="left-float" style={{width:120}}
                        defaultValue={keyType} model={keyTypeStateArray}
                        onSelect={s=> this.handleChange('keyType', s.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">业务类型</label>
                <Combox className="left-float" style={{width:120}}
                        defaultValue={businessType} model={terminalKeyBusinessTypeArray}
                        onSelect={s=> this.handleChange('businessType', s.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">用户级别</label>
                <Combox className="left-float" style={{width:120}}
                        defaultValue={userLevel} model={userLevelArray}
                        onSelect={s=> this.handleChange('userLevel', s.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">业务名称</label>
                <input type="text" className="form-control" value={name} placeholder="不超过20个字符"
                       onChange={e=>this.handleChange('name',e.target.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">业务号</label>
                <input type="number" min="0" max="99999" className="form-control" value={code} placeholder="填写BCD码"
                       onChange={e=>this.handleChange('code', e.target.value)}/>
            </div>
        </BaseDeviceConfig>
    }
});

let DeviceKeyConfig = connect(state => {
    let model = state.outlineConfigs['terminalkey'];
    if(!model)
        model = [];
    return {
        model
    }
})(DeviceKey);


var DeviceConfig = React.createClass({

    getInitialState(){
        return {
            index: 0,
            deviceNumber: ''
        }
    },

    handleDeviceSelect(row,event){
        if(event.key == 'business'){
            this.setState({
                index: 2,
                deviceNumber: row.code
            })
        }else if(event.key == 'keyconfig'){
            this.setState({
                index: 1,
                deviceNumber: row.code
            })
        }

    },

    handleReturn(){
      this.setState(this.getInitialState());
    },

    render(){
        let {index, deviceNumber} = this.state;
        return <SwitchView active={index}>
                <DeviceListConfig onDeviceSelect={this.handleDeviceSelect}/>
                <DeviceKeyConfig deviceNumber={deviceNumber} returnClick={this.handleReturn}/>
                <DeviceBusinessConfig deviceNumber={deviceNumber} returnClick={this.handleReturn}/>
            </SwitchView>
    }
});

export default DeviceConfig;