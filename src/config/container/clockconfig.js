import React from 'react'
import {connect} from 'react-redux'
import BaseConfig from '../component/baseconfig.js'
import PortSelect from '../component/portselect.js'
import {clockConfigColumns} from '../../constant/model.js'
import {open_confirm_dialog, close_confimr_dialog,
        remove_clock_config, save_clock} from '../../action/config.js'

var ClockConfig = React.createClass({
    
    getInitialState(){
        return {
            selectNetunit: -1,
            slot1: -1,
            port1: -1,
            slot2: -1,
            port2: -1,
            slot3: -1,
            port3: -1
        }
    },

    addAction(){
        this.setState(this.getInitialState());
    },

    removeAction(row){
        let {dispatch} = this.props;
        dispatch(open_confirm_dialog("删除时钟配置",
            "确定要删除"+row.netunit+"的时钟配置么?（删除配置不会下载到网元）", () => {
                dispatch(remove_clock_config(row.netunitId));
                dispatch(close_confimr_dialog());
            }))
    },

    saveAction(select){
        let {dispatch} = this.props;
        let {main, backup1, backup2} = this.refs;
        let [mainSelect, backup1Select, backup2Select] =
            [main.getSelect(), backup1.getSelect(), backup2.getSelect()];
        let data = {
            netunit: select.value,
            slot1: mainSelect.slot,
            port1: mainSelect.port,
            slot2: backup1Select.slot,
            port2: backup1Select.port,
            slot3: backup2Select.slot,
            port3: backup2Select.port
        };
        dispatch(save_clock(data));
    },
    modifyAction(row){
        this.setState({
            selectNetunit: row.netunitId,
            selectNetunitName: row.netunit,
            slot1: row.slot1,
            port1: row.port1,
            slot2: row.slot2,
            port2: row.port2,
            slot3: row.slot3,
            port3: row.port3
        })
    },

    handleSelectNetunit(v){
        this.setState({
            selectNetunit: v.value,
            selectNetunitName: v.text
        })
    },

    render(){
        let {selectNetunit,selectNetunitName, slot1, port1,
            slot2, port2, slot3, port3} = this.state;
        let dispatch = this.props.dispatch;

        let defaultNetunit;
        if(selectNetunit>0)
            defaultNetunit = {text: selectNetunitName, value: selectNetunit};

        return <BaseConfig ref="config" title="时钟" configType="clock"
                           configDialogWidth="500" configDialogHeight="550"
                           model={this.props.model} columns={clockConfigColumns}
                           defaultNetunit={defaultNetunit}
                           saveAction={this.saveAction} modifyAction={this.modifyAction}
                           addAction={this.addAction} removeAction={this.removeAction}
                           selectNetunit={this.handleSelectNetunit}>
            <div className="form-group">
                <label className="label-4">主时钟</label>
                <PortSelect ref="main" dispatch={dispatch} netunit={selectNetunit}
                            defaultSlot={slot1} defaultPort={port1}/>
            </div>
            <div className="form-group">
                <label className="label-4">备时钟1</label>
                <PortSelect ref="backup1" dispatch={dispatch} netunit={selectNetunit}
                            defaultSlot={slot2} defaultPort={port2}/>
            </div>
            <div className="form-group">
                <label className="label-4">备时钟2</label>
                <PortSelect ref="backup2" dispatch={dispatch} netunit={selectNetunit}
                            defaultSlot={slot3} defaultPort={port3}/>
            </div>
        </BaseConfig>
    }
});

function stateMap(state){

    let netunitMap = {};
    state.netUnitConfig.device.forEach(e => {
        netunitMap[e.id] = e.name;
    });
    let cardTypeMap = {};
    state.constant.cardTypes.forEach(e => {
        cardTypeMap[e.code] = e.name;
    });
    let model = state.outlineConfigs['clock'];
    if(!model)
        model = [];
    return {
        model: model.map(e => {
            return Object.assign({}, e, {
                netunitId: e.netunit,
                netunit: netunitMap[e.netunit],
                type1: cardTypeMap[e.type1],
                type2: cardTypeMap[e.type2],
                type3: cardTypeMap[e.type3]
            })
        })
    }
}

export default connect(stateMap)(ClockConfig);