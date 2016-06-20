import 'rc-dialog/assets/index.css'
import React, {PropTypes} from 'react'
import * as Action from '../../action/config.js'
import {OP_CARD_TYPE} from '../../constant/model.js'
import {connect} from 'react-redux'
import ConfigDialog from '../../common/component/configdialog.js'
import Combox from '../../common/component/combox.js'

var ConnectDialog = React.createClass({

    handleSelectSrcNet(value){
        this.props.dispatch(Action.after_select_src(value.value));
    },

    handleSelectDestNet(value){
        this.props.dispatch(Action.fetch_card_slot(value.value,
            OP_CARD_TYPE,
            data => this.props.dispatch(Action.after_select_dest(value.value,data))));
    },

    handleSave(){
        let srcId = this.refs.src.getSelect().value;
        let destId = this.refs.dest.getSelect().value;
        let slot = this.refs.slot.getSelect().value;
        let port = this.refs.port.getSelect().value;
        this.props.dispatch(Action.post_add_connect(
            srcId, destId, slot, port
        ));
    },

    render(){
        return <ConfigDialog width="400"
                            visible={this.props.visible}
                             cancelAction={{type: Action.CLOSE_CONNECT_DIALOG}}
                             onSave={this.handleSave}
                    title="新建连接">
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="label-3">源网元</label>
                    <Combox ref="src" className="left-float" style={{width:120}}
                            defaultValue="选择网元" model={this.props.srcNetunit}
                            onSelect={this.handleSelectSrcNet}/>
                </div>
                <div className="form-group">
                    <label className="label-3">目标网元</label>
                    <Combox ref="dest" className="left-float" style={{width:120}}
                            defaultValue="选择网元" model={this.props.destNetunit}
                            onSelect={this.handleSelectDestNet}/>
                </div>
                <div className="form-group">
                    <label className="label-3">传输板卡号</label>
                    <Combox ref="slot" className="left-float" style={{width:120}}
                            defaultValue="选择板卡号" model={this.props.card}/>
                </div>
                <div className="form-group">
                    <label className="label-3">端口号</label>
                    <Combox ref="port" className="left-float" style={{width:120}}
                            defaultValue="选择端口" model={this.props.port}/>
                </div>
            </form>
        </ConfigDialog>
    }
});

function stateMap(state){
    let connectState = state.ui.connect;
    let topoConnect = state.netUnitConfig;
    const netUnitSize = topoConnect.device.length;

    //选择源
    let srcNetunit = topoConnect.device.filter(
        e => {
            let count = 0;
            topoConnect.connect.forEach(c => {
                if(c.srcId == e.id)
                    count ++
            });
            return count < netUnitSize;
        }
    ).map(e => {
        return {
            text: e.name,
            value: e.id
        }
    });

    //选择目标
    let destNetunit = [];
    if(connectState.srcSelect >= 0){
        destNetunit = topoConnect.device.filter(
            e => topoConnect.connect.filter(c => c.srcId == connectState.srcSelect
            && c.destId == e.id).length == 0
            && e.id != connectState.srcSelect
        ).map(e => {
            return {
                text: e.name,
                value: e.id
            }
        });
    }

    let card = [];
    if(connectState.destSelect >= 0)
        card = connectState.card.map(c => {
            return {
                text: c.slot,
                value: c.slot
            }
        });

    return {
        srcNetunit: srcNetunit,
        destNetunit: destNetunit,
        visible: connectState.visible,
        card: card,
        port: [{
            text: '0',
            value: 0
        },
        {
            text: '1',
            value: 1
        }
        ]
    };
}

export default connect(stateMap)(ConnectDialog);