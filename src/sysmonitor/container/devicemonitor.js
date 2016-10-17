import React from 'react'
import {connect} from 'react-redux'
import GridView from "../../common/component/gridview.js"
import NetworkStatusBar, * as NetworkStatus from '../component/networkstatusbar.js'
import RefreshButton from '../component/refreshbutton.js'
import {fetch_device} from '../../action/config.js'
import {set_timer} from '../../action/network.js'
import {REFRESH_INTERVAL} from '../../constant/model.js'
const width = 80;
const height = 80;

function deviceCell(model,index){
    const status = model.state == undefined ? NetworkStatus.STATUS_UNKNOWN : model.state;
    return <div style={{
        backgroundColor: NetworkStatus.statusColor[status].color,
        width: width,
        height: height
    }}>
        <p>{model.name}</p>
        <p>{model.code}</p>
        <p>{model.netUnitName}</p>
    </div>
}

var DeviceMonitor = React.createClass({

    componentWillMount(){
        this.props.dispatch(fetch_device());
    },

    render(){
        return(
        <div style={{marginLeft: 30}}>
            <div>
                <RefreshButton className="left-float" style={{marginLeft: 50}} api="network/refresh"/>
                <NetworkStatusBar/>
            </div>
            <GridView gridWidth={width} gridHeight={height} cellSpace="10" adapter={deviceCell} data={this.props.model}/>
        </div>
        );
    }
});

var DeviceState = React.createClass({

    componentWillReceiveProps(nextProps){
        let id = nextProps.netunit;
        let {dispatch, netunit} = this.props;
        if(typeof netunit == 'object' && typeof id == 'number') {
            dispatch(fetch_device(id));
            dispatch(set_timer(setInterval(function () {
                dispatch(fetch_device(id));
            }, REFRESH_INTERVAL)));
        }
    },

    render(){
        return(
            <div style={{marginLeft: 30}}>
                <GridView gridWidth={width} gridHeight={height} cellSpace="10" adapter={deviceCell} data={this.props.model}/>
            </div>
        );
    }
});


function stateMap(state){
    let model = state.deviceConfig.map(e => {
        let deviceState = state.deviceState.filter(s => e.id == s.id);
        let device = {
            name: e.name,
            netUnitName: e.netUnitName,
            code: e.code
        };
        if(deviceState.length > 0)
            device.state = deviceState[0].state;
        return device;
    });
    return {
        model: model
    }
}

export var DeviceNetunitState = connect(stateMap)(DeviceState);

export default connect(stateMap)(DeviceMonitor);

