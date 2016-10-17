import React from 'react'
import {connect} from 'react-redux'
import * as Action from '../../action/config.js'
import PhysicTopo from '../../common/component/physictopo.js'
import ElementDialog from './elementdialog.js'
import ConnectDialog from './connectdialog.js'
import CardConfig from './cardconfig.js'
import SwitchView from '../../common/component/switchview.js'
import PopupMenu from '../../common/component/popupmenu.js'
import DeviceDialog from './devicedialog.js'
import DevicePortDialog from './portdialog.js'

const menu = [
    {
        key: 'config',
        text: '配置板卡'
    },
    {
        key: 'modify',
        text: '修改'
    },
    {
        key: 'remove',
        text: '删除'
    }
];

var NetworkConfig = React.createClass({

    handleClick(e,index,node,event){
        switch(node.type) {
            case 'netunit':
            this.props.dispatch(
                    Action.get_card_list(e, data => this.props.dispatch(Action.open_card_config_dialog(data))));
                this.refs.popup.popoff(); break;
        }
    },

    handleRightClick(e, index, node, event){
        this.refs.popup.popup(event.pageX, event.pageY);
        this.selectElement = e;
    },

    handleItemClick(key, item, event){
        switch(key){
            case 'config':
                this.props.dispatch(
                    Action.get_card_list(this.selectElement,
                        data => this.props.dispatch(Action.open_card_config_dialog(data))));
                break;
            case 'modify':
                this.props.dispatch(
                    Action.fetch_element(this.selectElement.id,
                        data => this.props.dispatch(Action.open_add_dialog('modify',data)))
                    );
                break;
            case 'remove':
                this.props.dispatch(
                    Action.open_confirm_dialog('删除网元','确定要删除'+this.selectElement.name+"及其配置么?",
                    () => this.props.dispatch(Action.remove_element(this.selectElement.id))));
        }
    },

    render(){
        let width = $(window).width()*0.8;
        let height = $(window).height()*0.8;
        return (
            <div>
                <SwitchView active={this.props.active}>
                    <div>
                        <div className="form-group">
                            <button className="btn btn-default"
                                    onClick={()=> this.props.dispatch(Action.open_add_dialog())}>新增网元</button>
                            <button className="btn btn-default compact-inline"
                                    onClick={()=> this.props.dispatch(Action.open_connect_dialog())}>新建连接</button>
                        </div>
                        <PhysicTopo width={width} height={height} model={this.props.device}
                                    connect = {this.props.connect}
                                    stageClick = {() => this.refs.popup.popoff()}
                                    onClick={this.handleClick}
                                    rightClick={this.handleRightClick}/>
                    </div>
                    <CardConfig/>
                </SwitchView>
                <ConnectDialog/>
                <ElementDialog/>
                <DeviceDialog/>
                <DevicePortDialog/>
                <PopupMenu ref="popup" model={menu} onItemClick={this.handleItemClick}/>
            </div>
        )
    }
});

function stateMap(state){
    // return state.netUnitConfig;
    return {
        device: state.netUnitConfig.device,
        connect: state.netUnitConfig.connect,
        active: state.ui.cardConfig.visible?1:0
    }
}

export default connect(stateMap)(NetworkConfig);