import React from 'react'
import {connect} from 'react-redux'
import {DateFormatSpinnerInput, TimePicker} from 'react-date-picker'
import BaseConfig from '../component/baseconfig.js'
import PortSelect from '../component/portselect.js'
import Combox from '../../common/component/combox.js'
import EnableSwitch from '../component/rightswitch.js'
import {userDataConfigColumn, tsInfo ,clearKey, rightValue2Text, userDataDisplayKey} from '../../constant/model.js'
import {callRightArray, callRightMap, userLevelArray, userLevelMap,
    termTypaArray, termTypeMap, userTypeArray, userTypeMap} from '../../constant/enumerate.js'
import {open_confirm_dialog, close_confimr_dialog,
    remove_user_data, save_user_data} from '../../action/config.js'

function cardTypeFilter(e){
    return tsInfo[e.code] != undefined;
}

function tsGenerate(c){
    let tsNum = tsInfo[c.code];
    if(tsNum == undefined)
        return [];
    let ts = new Array(tsNum);
    for(var i=0; i<tsNum; i++)
        ts[i] = {
            text: i,
            value: i
        };
    return ts;
}

var UserDataConfig = React.createClass({

    getInitialState(){
        return {
            id: 0,
            selectNetunit: -1,
            selectRow: {
                id: 0,
                netunit: 0,
                slot: -1,
                ts: -1,
                number: '',
                callRight: 3,
                termType: 1,
                userType: 1,
                userLevel: 1,
                recordRight: false,
                recordEnable: false,
                hotlineRight: false,
                hotlineEnable: false,
                hotlineNumber: '',
                busingcfRight: false,
                busingcfEnable: false,
                busingcfNumber: '',
                followcfRight: false,
                followcfEnable: false,
                followcfNumber: '',
                nohinderRight: false,
                nohinderEnable: false,
                reminderRight: false,
                reminderEnable: false,
                phonestationRight: false,
                phonestationEnable: false,
                volatileMeetRight: false,
                digitRelayRight: false,
                simulateRelayRight: false
            }
        }
    },

    addAction(){
        this.setState(this.getInitialState());
    },

    saveAction(select){
        let {selectRow} = this.state;
        let cardSelect = this.refs.card.getSelect();
        let data = Object.assign({}, selectRow, {
            netunit: select.value,
            slot: cardSelect.slot,
            ts: cardSelect.port
        });
        clearKey(data, userDataDisplayKey);
        this.props.dispatch(save_user_data(data));
    },

    modifyAction(row){
        this.setState({
            selectRow: row,
            selectNetunit: row.netunitId
        });
    },

    removeAction(row){
        let {dispatch} = this.props;
        dispatch(open_confirm_dialog("删除用户数据配置",
            "确定要删除"+row.netunit+"的用户数据配置么?（删除配置不会下载到网元）", () => {
                dispatch(remove_user_data(row.id));
                dispatch(close_confimr_dialog());
            }))
    },
    
    handleSelectNetunit(e){
        this.setState({
            selectNetunit: e.value
        })
    },

    handleChange(newState){
        let selectRow = Object.assign({}, this.state.selectRow,newState);
        this.setState({
            selectRow: selectRow
        });
    },


    render(){
        let {selectRow, selectNetunit} = this.state;
        let {dispatch} = this.props;
        let defaultNetunit;
        if(selectNetunit>0)
            defaultNetunit =  selectNetunit;
        return <BaseConfig title="用户数据" configType="userdata"
                           configDialogWidth="650" configDialogHeight="680"
                           model={this.props.model} columns={userDataConfigColumn}
                           defaultNetunit={defaultNetunit} selectNetunit={this.handleSelectNetunit}
                           saveAction={this.saveAction} modifyAction={this.modifyAction}
                           addAction={this.addAction} removeAction={this.removeAction}>
            <div className="form-group">
                <label className="label-4">用户号码</label>
                <input type="number" min="0" max="99999" className="form-control" value={selectRow.number}
                       onChange={e=>this.handleChange({number: e.target.value})}/>
            </div>
            <div className="form-group">
                <label className="label-4">板卡选择</label>
                <PortSelect ref="card" portLabel="选择时隙" defaultSlot={selectRow.slot}
                            dispatch={dispatch} defaultPort={selectRow.ts} netunit={selectNetunit}
                            cardFilter={cardTypeFilter} portGenerate={tsGenerate}/>
            </div>
            <div className="form-group">
                <label className="label-4">呼叫权限</label>
                <Combox className="left-float" style={{width:120}}
                defaultValue={selectRow.callRight} model={callRightArray} onSelect={e => this.handleChange({callRight: e.value})}/>
                <label className="label-4">终端类型</label>
                <Combox className="left-float" style={{width:120}}
                        defaultValue={selectRow.termType} model={termTypaArray} onSelect={e => this.handleChange({termType: e.value})}/>
            </div>
            <div className="form-group">
                <label className="label-4">用户类型</label>
                <Combox className="left-float" style={{width:120}}
                        defaultValue={selectRow.userType} model={userTypeArray} onSelect={e => this.handleChange({userType: e.value})}/>
                <label className="label-4">用户级别</label>
                <Combox className="left-float" style={{width:120}}
                        defaultValue={selectRow.userLevel} model={userLevelArray} onSelect={e => this.handleChange({userLevel: e.value})}/>
            </div>
            <div className="form-group">
                <label className="label-4">权限配置:</label>
            </div>
            <div className="form-group" style={{marginLeft:30}}>
                <EnableSwitch rightLabel="录音权限" enableLabel="录音开关"
                              right={selectRow.recordRight} enable={selectRow.recordEnable}
                              rightKey="recordRight" enableKey="recordEnable" onChange={this.handleChange}/>
                <EnableSwitch rightLabel="热线权限" enableLabel="热线开关"
                              right={selectRow.hotlineRight} enable={selectRow.hotlineEnable}
                              rightKey="hotlineRight" enableKey="hotlineEnable" onChange={this.handleChange}>
                    <label className="label-nm-3">热线号码</label>
                    <input type="number" min="0" max="99999" className="form-control" value={selectRow.hotlineNumber}
                           onChange={e=>this.handleChange({hotlineNumber: e.target.value})}/>
                </EnableSwitch>
                <EnableSwitch rightLabel="遇忙转移权限" enableLabel="遇忙转移开关"
                              right={selectRow.busingcfRight} enable={selectRow.busingcfEnable}
                              rightKey="busingcfRight" enableKey="busingcfEnable" onChange={this.handleChange}>
                    <label className="label-nm-3">遇忙转移号码</label>
                    <input type="number" min="0" max="99999" className="form-control" value={selectRow.busingcfNumber}
                           onChange={e=>this.handleChange({busingcfNumber: e.target.value})}/>
                </EnableSwitch>
                <EnableSwitch rightLabel="跟随转移权限" enableLabel="跟随转移开关"
                              right={selectRow.followcfRight} enable={selectRow.followcfEnable}
                              rightKey="followcfRight" enableKey="followcfEnable" onChange={this.handleChange}>
                    <label className="label-nm-3">跟随转移号码</label>
                    <input type="number" min="0" max="99999" className="form-control" value={selectRow.followcfNumber}
                           onChange={e=>this.handleChange({followcfNumber: e.target.value})}/>
                </EnableSwitch>
                <EnableSwitch rightLabel="免打扰权限" enableLabel="免打扰开关"
                              right={selectRow.nohinderRight} enable={selectRow.nohinderEnable}
                              rightKey="nohinderRight" enableKey="nohinderEnable" onChange={this.handleChange}/>
                <EnableSwitch rightLabel="定时提醒权限" enableLabel="定时提醒开关"
                              right={selectRow.reminderRight} enable={selectRow.reminderEnable}
                              rightKey="reminderRight" enableKey="reminderEnable" onChange={this.handleChange}>
                    <label className="label-nm-3">提醒时间</label>
                    <DateFormatSpinnerInput className="left-float time-input" dateFormat="HH:mm:ss"
                                            value={selectRow.reminderTime==''?undefined:selectRow.reminderTime}
                                onChange={e=>this.handleChange({reminderTime: e})}/>
                </EnableSwitch>
                <EnableSwitch rightLabel="话务台权限" enableLabel="话务台开关"
                              right={selectRow.phonestationRight} enable={selectRow.phonestationEnable}
                              rightKey="phonestationRight" enableKey="phonestationEnable" onChange={this.handleChange}/>
                <div className="form-group">
                    <div className="left-float">
                        <label className="label-nm-3">
                            <input type="checkbox" className="left-float" checked={selectRow.volatileMeetRight?'checked':''}
                               onChange={e=>this.handleChange({volatileMeetRight: e.target.checked})}/>
                            可变会议权限</label>
                    </div>
                    <div className="left-float">
                        <label className="label-nm-3">
                        <input type="checkbox" className="left-float" checked={selectRow.digitRelayRight?'checked':''}
                               onChange={e=>this.handleChange({digitRelayRight: e.target.checked})}/>
                            数字中继权限</label>
                    </div>
                    <div className="left-float">
                        <label className="label-nm-3">
                        <input type="checkbox" className="left-float" checked={selectRow.simulateRelayRight?'checked':''}
                               onChange={e=>this.handleChange({simulateRelayRight: e.target.checked})}/>
                            模拟中继权限</label>
                    </div>
                </div>
            </div>
        </BaseConfig>
    }
});

function stateMap(state){
    let netunitMap = {};
    state.netUnitConfig.device.forEach(e => {
        netunitMap[e.id] = e.name;
    });

    let model = state.outlineConfigs['userdata'];
    if(!model)
        model = [];
    return {
        model: model.map(e => {
            return Object.assign({}, e, {
                netunitId: e.netunit,
                netunit: netunitMap[e.netunit],
                callRightName: callRightMap[e.callRight],
                termTypeName: termTypeMap[e.termType],
                userTypeName: userTypeMap[e.userType],
                userLevelName: userLevelMap[e.userLevel],
                recordText: rightValue2Text(e.recordRight,e.recordEnable),
                hotlineText: rightValue2Text(e.hotlineRight,e.hotlineEnable,'热线号码'+e.hotlineNumber),
                busingcfText: rightValue2Text(e.busingcfRight, e.busingcfEnable, '遇忙转移号码'+e.busingcfNumber),
                followcfText: rightValue2Text(e.followcfRight, e.followcfEnable, '跟随转移号码'+e.followcfNumber),
                nohinderText: rightValue2Text(e.nohinderRight, e.nohinderEnable),
                reminderText: rightValue2Text(e.reminderRight, e.reminderEnable, '提醒时间'+e.reminderTime),
                phonestationText: rightValue2Text(e.phonestationRight, e.phonestationEnable),
                volatileMeetText: rightValue2Text(e.volatileMeetRight),
                digitRelayText: rightValue2Text(e.digitRelayRight),
                simulateRelayText: rightValue2Text(e.simulateRelayRight)
            })
        })
    }
}

export default connect(stateMap)(UserDataConfig);