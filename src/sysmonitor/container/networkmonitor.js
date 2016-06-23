import React from 'react'
import {connect} from 'react-redux'
import PhysicTopo from './../../common/component/physictopo.js'
import CardDialog from './carddialog.js'
import NetworkStatusBar, {STATUS_UNKNOWN,statusColor} from '../component/networkstatusbar.js'
import SwitchView from '../../common/component/switchview.js'
import {open_card_dialog} from '../../action/network.js'
import {refresh_config, get_card_list} from '../../action/config.js'
import {set_timer, fetch_net_state, close_card_dialog} from '../../action/network.js'
import {REFRESH_INTERVAL} from '../../constant/model.js'

var NetworkMonitor = React.createClass({

    componentWillMount(){
        this.props.dispatch(refresh_config());
    },

    renderNodeState(e,n){
        n.fillColor = statusColor[e.state].rgbColor;
    },

    renderDeviceState(e,n,l){
        l.strokeColor = statusColor[e.state].rgbColor;

    },

    componentDidUpdate(){
        this.refs.topo.refreshTopo();
    },

    renderConnectState(l,c){
        l.strokeColor = statusColor[c.state].rgbColor;
    },

    handleNodeClick(e, index, node, event){
        this.props.dispatch(get_card_list(e,
            (data) => this.props.dispatch(open_card_dialog(data))))
    },

    render: function () {
        return(
            <div>
                <div>
                    <button style={{display:this.props.active == 0?'none':'inline-block',
                                    marginLeft: 40}}
                            className="btn btn-default left-float"
                            onClick={() => {
                                let {dispatch} = this.props;
                                dispatch(fetch_net_state());
                                dispatch(set_timer(setInterval(function(){
                                    dispatch(fetch_net_state());
                                },REFRESH_INTERVAL)));
                                dispatch(close_card_dialog())}

                            }>返回</button>
                    <NetworkStatusBar/>
                </div>
                <SwitchView active={this.props.active}>
                    <PhysicTopo ref="topo"
                        width="1000" height="600" model={this.props.netunit}
                                connect = {this.props.connect}
                                adapter = {this.renderNodeState}
                                deviceAdapter = {this.renderDeviceState}
                                connectAdapter = {this.renderConnectState}
                                onClick={this.handleNodeClick}/>
                    <CardDialog/>
                </SwitchView>
            </div>
        )
    }
    
});

function stateMap(state){

    //设置网元和设备状态
    let netunit = state.netUnitConfig.device;
    let netunitState = state.topoState.netunit;
    let deviceState = state.topoState.device;
    netunit.forEach(e => {
        let state = netunitState.filter(n => n.id == e.id);
        if(state.length>0)
            e.state = state[0].state;
        else
            e.state = STATUS_UNKNOWN;
        e.devices.forEach(d => {
            state = deviceState.filter( ds => ds.id == d.id);
            if(state.length>0)
                d.state = state[0].state;
            else
                d.state = STATUS_UNKNOWN;
        })
    });

    //设置连接状态
    let connect = state.topoState.connect;

    return {
        netunit,
        connect,
        active: state.ui.card.visible?1:0
    };
}

export default connect(stateMap)(NetworkMonitor);