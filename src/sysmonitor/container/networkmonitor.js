import React from 'react'
import {connect} from 'react-redux'
import PhysicTopo from './../../common/component/physictopo.js'
import CardDialog from './carddialog.js'
import {DeviceNetunitState} from './devicemonitor.js'
import RefreshButton from '../component/refreshbutton.js'
import NetworkStatusBar, {STATUS_UNKNOWN,STATUS_NORMAL,
    STATUS_ERROR, STATUS_NETWORK_ERROR, statusColor} from '../component/networkstatusbar.js'
import SwitchView from '../../common/component/switchview.js'
import {refresh_config, get_card_list, fetch_device} from '../../action/config.js'
import {set_timer, fetch_net_state, close_card_dialog,open_card_dialog, fetch_card_state} from '../../action/network.js'
import {REFRESH_INTERVAL, paramConfig, cloudImg} from '../../constant/model.js'

var NetworkMonitor = React.createClass({

    componentWillMount(){
        this.props.dispatch(refresh_config());
    },

    renderNodeState(e,n){
        n.fillColor = statusColor[e.state].rgbColor;
    },

    renderDeviceState(e,n){
        n.fillColor = statusColor[e.state].rgbColor;
    },
    
    renderCloudState(e,n){
        let normal=0,fail=0, outline=0, unknown=0;
        for(var i=0; i<e.devices.length;i++){
            switch(e.devices[i].state){
                case STATUS_NORMAL: normal++; break;
                case STATUS_ERROR: fail++; break;
                case STATUS_NETWORK_ERROR: outline++; break;
                default: unknown++;
            }
        }
        let state = e.state;
        if(fail>0)
            state = STATUS_ERROR;
        else if(normal>0)
            state = STATUS_NORMAL;

        n.setImage(cloudImg[state], false);
        n.fontColor = '0.0.0';
        n.text='正常'+normal+', 故障'+fail+', 网络故障'+outline+', 未知'+unknown;
    },

    componentDidUpdate(){
        this.refs.topo.refreshTopo();
    },

    renderConnectState(l,c){
        l.strokeColor = statusColor[c.state].rgbColor;
    },

    handleNodeClick(e, index, node, event){
        let {dispatch} = this.props;
        switch(node.type){
            case 'netunit': dispatch(get_card_list(e,
                (data) => {
                    dispatch(open_card_dialog(data));
                    dispatch(fetch_card_state(e.id));
                    dispatch(set_timer(setInterval(function () {
                        dispatch(fetch_card_state(e.id));
                    }, REFRESH_INTERVAL)));
                })); break;
            case 'container': dispatch(fetch_device(node.netunit)); break;
        }

    },

    render: function () {
        let width = $(window).width()*0.8;
        let height = $(window).height()*0.8;
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
                    <RefreshButton className="left-float" style={{marginLeft: 80}} api="network/refresh"/>
                    <NetworkStatusBar/>
                </div>
                <SwitchView active={this.props.active}>
                    <PhysicTopo ref="topo"
                        width={width} height={height} deviceLimitCount={paramConfig.deviceLimitCount}
                                model={this.props.netunit}
                                connect = {this.props.connect}
                                adapter = {this.renderNodeState}
                                deviceAdapter = {this.renderDeviceState}
                                connectAdapter = {this.renderConnectState}
                                containerAdapter = {this.renderCloudState}
                                onClick={this.handleNodeClick}/>
                    <CardDialog/>
                    <DeviceNetunitState />
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
        active: state.ui.card.active,
        deviceNetunit: state.ui.card.netunit
    };
}

export default connect(stateMap)(NetworkMonitor);