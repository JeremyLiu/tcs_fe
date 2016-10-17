import React from 'react'
import {connect} from 'react-redux'
import BaseConfig from '../component/baseconfig.js'
import UserDataSelect from '../component/usernumberselect.js'
import {broadcastColumn} from '../../constant/model.js'
import {open_confirm_dialog, close_confimr_dialog,
    remove_broadcast, save_broadcast} from '../../action/config.js'

var BroadcastConfig = React.createClass({

    getInitialState(){
        return {
            id: 0,
            selectNetunit: -1,
            name: '',
            code: '',
            broadcaster:'',
            users: [],
            members: []
        }
    },

    addAction(){
        this.setState(this.getInitialState());
    },

    saveAction(select){
        let {name, code, broadcaster, 
            users, members, id} = this.state;
        let data = {
            id: id,
            netunit: select.value,
            name: name,
            code: code,
            broadcaster:broadcaster,
            users: users.join('\n'),
            members: members.join('\n')
        };
        this.props.dispatch(save_broadcast(data));
    },

    modifyAction(row){
        this.setState({
            id: row.id,
            selectNetunit: row.netunitId,
            selectNetunitName: row.netunit,
            name: row.name,
            code: row.code,
            users: row.users,
            members: row.members,
            broadcaster: row.broadcaster
        });
    },

    removeAction(row){
        let {dispatch} = this.props;
        dispatch(open_confirm_dialog("删除广播配置",
            "确定要删除"+row.netunit+"的广播配置么?（删除配置不会下载到网元）", () => {
                dispatch(remove_broadcast(row.id));
                dispatch(close_confimr_dialog());
            }))
    },

    handleChange(prop,value){
        let newState = {};
        newState[prop] = value;
        this.setState(newState);
    },

    render(){
        let {name, code, users, members, broadcaster,
            selectNetunit, selectNetunitName} = this.state;

        let defaultNetunit;
        if(selectNetunit>0)
            defaultNetunit = {text: selectNetunitName, value: selectNetunit};
        return <BaseConfig title="广播" configType="broadcast"
                           configDialogWidth="450" configDialogHeight="550"
                           model={this.props.model} columns={broadcastColumn}
                           defaultNetunit={defaultNetunit}
                           saveAction={this.saveAction} modifyAction={this.modifyAction}
                           addAction={this.addAction} removeAction={this.removeAction}>
            <div className="form-group">
                <label className="label-4">业务名称</label>
                <input type="text" className="form-control" value={name} placeholder="不超过20个字符"
                       onChange={e=>this.handleChange('name', e.target.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">业务号</label>
                <input type="number" min="0" max="99999"
                       className="form-control" value={code} placeholder="填写BCD码"
                       onChange={e=>this.handleChange('code', e.target.value)}/>
            </div>
            <div className="form-group">
                <label className="label-4">有权用户</label>
                <UserDataSelect placehoder="点击选择,不超过10个" style={{width: 250,float:'left'}}
                                value={users} onChange={v=>this.handleChange('users', v)}/>
            </div>
            <div className="form-group">
                <label className="label-4">广播机号码</label>
                <UserDataSelect placehoder="点击选择" style={{width: 100,float:'left'}}
                                multiple={false}
                                value={broadcaster} filter={e=>e.userLevel==14}
                                onChange={v=>this.handleChange('broadcaster', v)}/>
            </div>
            <div className="form-group">
                <label className="label-4">成员</label>
                <UserDataSelect placehoder="点击选择, 最多40个" style={{width: 250,float:'left'}}
                                value={members} onChange={v=>this.handleChange('members', v)}/>
            </div>
        </BaseConfig>
    }
});

function stateMap(state){
    let netunitMap = {};
    state.netUnitConfig.device.forEach(e => {
        netunitMap[e.id] = e.name;
    });

    let model = state.outlineConfigs['broadcast'];
    if(!model)
        model = [];
    return {
        model: model.map(e => {
            return Object.assign({}, e, {
                netunitId: e.netunit,
                netunit: netunitMap[e.netunit],
                usersText: e.users.join('\n'),
                membersText: e.members.join('\n')
            })
        })
    }
}

export default connect(stateMap)(BroadcastConfig);