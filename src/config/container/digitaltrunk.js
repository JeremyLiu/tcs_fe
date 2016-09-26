import React from 'react'
import {connect} from 'react-redux'
import BaseConfig from '../component/baseconfig.js'
import PortSelect from '../component/portselect.js'
import {digitTrunkColumns ,CARD_TYPE_DIGITTRUNK} from '../../constant/model.js'
import {open_confirm_dialog, close_confimr_dialog,
    remove_digittrunk_config, save_digittrunk} from '../../action/config.js'

var DigitalTrunk = React.createClass({

    getInitialState(){
        return {
            id: 0,
            selectNetunit: -1,
            slot: -1,
            port: -1,
            opc: '',
            dpc: '',
            cic: ''
        }
    },

    addAction(){
      this.setState(this.getInitialState());
    },

    saveAction(select){
        let {opc, dpc, cic, id} = this.state;
        let slotSelect = this.refs.slotSelect.getSelect();
        let data = {
            id: id,
            netunit: select.value,
            slot: slotSelect.slot,
            port: slotSelect.port,
            opc: opc,
            dpc: dpc,
            cic: cic
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
            opc: row.opc,
            dpc: row.dpc,
            cic: row.cic
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

    handleChange(prop,e){
        let newState = {};
        newState[prop] = e.target.value;
        this.setState(newState);
    },

    handleSelectNetunit(v){
        this.setState({
            selectNetunit: v.value,
            selectNetunitName: v.text
        })
    },

    render(){
        let {slot, port, opc, dpc, cic, selectNetunit, selectNetunitName} = this.state;
        let {dispatch, model} = this.props;
        let defaultNetunit;
        if(selectNetunit>0)
            defaultNetunit = {text: selectNetunitName, value: selectNetunit};

        return <BaseConfig title="数字中继" configType="digittrunk"
                           configDialogWidth="450" configDialogHeight="400"
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
                <label className="label-4">opc</label>
                <input type="text" className="form-control" value={opc}
                       placeholder="格式示例: 128.0.1" onChange={this.handleChange.bind(this,'opc')}/>
            </div>
            <div className="form-group">
                <label className="label-4">dpc</label>
                <input type="text" className="form-control" value={dpc}
                       placeholder="格式示例: 128.0.1" onChange={this.handleChange.bind(this,'dpc')}/>
            </div>
            <div className="form-group">
                <label className="label-4">cic</label>
                <input type="text" className="form-control" value={cic}
                       placeholder="格式示例: 128.0.1" onChange={this.handleChange.bind(this,'cic')}/>
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
                netunit: netunitMap[e.netunit]
            })
        })
    }
}

export default connect(stateMap)(DigitalTrunk);