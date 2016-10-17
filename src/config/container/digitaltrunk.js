import React from 'react'
import {connect} from 'react-redux'
import Combox from '../../common/component/combox.js'
import BaseConfig from '../component/baseconfig.js'
import PortSelect from '../component/portselect.js'
import {digitTrunkColumns ,CARD_TYPE_DIGITTRUNK} from '../../constant/model.js'
import {relayModeArray, relayModeMap,
    relayClockModeArray, relayClockModeMap,
    relayDistanceModeArray, relayDistanceModeMap,
    relayInterfaceArray, relayInterfaceTypeMap} from '../../constant/enumerate.js'
import {open_confirm_dialog, close_confimr_dialog,
    remove_digittrunk_config, save_digittrunk} from '../../action/config.js'

var DigitalTrunk = React.createClass({

    getInitialState(){
        return {
            id: 0,
            selectNetunit: -1,
            slot: -1,
            port: -1,
            mode: 1,
            interfaceType: 0,
            distanceMode: 1,
            clockMode: 1,
            pcmNum: '',
            pcmTs: '',
            opc: '',
            dpc: ''
        }
    },

    addAction(){
      this.setState(this.getInitialState());
    },

    saveAction(select){
        let {opc, dpc, id, mode, interfaceType,
            distanceMode, clockMode, pcmNum, pcmTs} = this.state;
        let slotSelect = this.refs.slotSelect.getSelect();
        let data = {
            id: id,
            netunit: select.value,
            slot: slotSelect.slot,
            port: slotSelect.port,
            mode: mode,
            interfaceType: interfaceType,
            distanceMode: distanceMode,
            clockMode: clockMode,
            pcmNum: parseInt(pcmNum),
            pcmTs: parseInt(pcmTs),
            opc: opc,
            dpc: dpc
        };
        this.props.dispatch(save_digittrunk(data));
    },

    modifyAction(row){

        this.setState({
            id: row.id,
            selectNetunit: row.netunitId,
            selectNetunitName: row.netunit,
            slot: row.slot,
            port: row.port,
            mode: row.mode,
            interfaceType: row.interfaceType,
            distanceMode: row.distanceMode,
            clockMode: row.clockMode,
            pcmNum: row.pcmNum,
            pcmTs: row.pcmTs,
            opc: row.opc,
            dpc: row.dpc
        });
    },

    removeAction(row){
        let {dispatch} = this.props;
        dispatch(open_confirm_dialog("删除数字配置",
            "确定要删除"+row.netunit+"的数字中继配置么?（删除配置不会下载到网元）", () => {
                dispatch(remove_digittrunk_config(row.id));
                dispatch(close_confimr_dialog());
            }))
    },

    handleChange(prop,value){
        let newState = {};
        newState[prop] = value;
        this.setState(newState);
    },

    handleSelectNetunit(v){
        this.setState({
            selectNetunit: v.value,
            selectNetunitName: v.text
        })
    },

    render(){
        let {slot, port, opc, dpc, mode, pcmNum, pcmTs,
            interfaceType, distanceMode, clockMode,
            selectNetunit, selectNetunitName} = this.state;
        let {dispatch, model} = this.props;
        let defaultNetunit;
        if(selectNetunit>0)
            defaultNetunit = {text: selectNetunitName, value: selectNetunit};

        return <BaseConfig title="数字中继" configType="digittrunk"
                           configDialogWidth="480" configDialogHeight="400"
                           model={model} columns={digitTrunkColumns}
                           defaultNetunit={defaultNetunit}
                           saveAction={this.saveAction} modifyAction={this.modifyAction}
                           addAction={this.addAction} removeAction={this.removeAction}
                           selectNetunit={this.handleSelectNetunit}>
            <div className="form-group">
                <label className="label-4">槽位端口</label>
                <PortSelect ref="slotSelect" dispatch={dispatch} netunit={selectNetunit}
                            defaultSlot={slot} defaultPort={port} typeFilter={CARD_TYPE_DIGITTRUNK}/>
            </div>
            <div className="form-group">
                <label className="label-6">模式</label>
                <Combox className="left-float" style={{width:80}}
                        defaultValue={mode} model={relayModeArray} onSelect={e => this.handleChange('mode', e.value)}/>
                <label className="label-4">接口类型</label>
                <Combox className="left-float" style={{width:100}}
                        defaultValue={interfaceType} model={relayInterfaceArray} onSelect={e => this.handleChange('interfaceType', e.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">距离模式</label>
                <Combox className="left-float" style={{width:70}} defaultValue={distanceMode}
                        model={relayDistanceModeArray} onSelect={e => this.handleChange('distanceMode', e.value)}/>
                <label className="label-6">时钟</label>
                <Combox className="left-float" style={{width:120}} defaultValue={clockMode}
                        model={relayClockModeArray} onSelect={e => this.handleChange('clockMode', e.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">opc</label>
                <input type="text" className="form-control" value={opc}
                       placeholder="格式示例: A.B.C, 其中A/B/C为10进制" onChange={e=>this.handleChange('opc',e.target.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">dpc</label>
                <input type="text" className="form-control" value={dpc}
                       placeholder="格式示例: A.B.C, 其中A/B/C为10进制" onChange={e=>this.handleChange('dpc', e.target.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">PCM序号</label>
                <input type="number" min="0" max="127" className="form-control left-float" value={pcmNum}
                       onChange={e => this.handleChange('pcmNum', e.target.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">PCM时隙</label>
                <input type="number" min="0" max="31" className="form-control left-float" value={pcmTs}
                       onChange={e => this.handleChange('pcmTs', e.target.value)}/>
            </div>
        </BaseConfig>
    }
});

function stateMap(state){
    let netunitMap = {};
    state.netUnitConfig.device.forEach(e => {
        netunitMap[e.id] = e.name;
    });

    let model = state.outlineConfigs['digittrunk'];
    if(!model)
        model = [];
    return {
        model: model.map(e => {
            return Object.assign({}, e, {
                netunitId: e.netunit,
                netunit: netunitMap[e.netunit],
                modeText: relayModeMap[e.mode],
                interfaceTypeText: relayInterfaceTypeMap[e.interfaceType],
                distanceModeText: relayDistanceModeMap[e.distanceMode],
                clockModeText: relayClockModeMap[e.clockMode]
            })
        })
    }
}

export default connect(stateMap)(DigitalTrunk);