import React from 'react'
import {connect} from 'react-redux'
import GridView from "../../common/component/gridview.js"
import NetworkStatusBar, * as NetworkStatus from '../component/networkstatusbar.js'
import {fetch_device} from '../../action/config.js'

const width = 80;
const height = 80;

// const model = [
//     {
//         name: "指挥分机",
//         ip: "192.168.0.1",
//         net: "网元一",
//         card: "板卡1"
//     },
//     {
//         name: "指挥分机",
//         ip: "192.168.0.1",
//         net: "网元一",
//         card: "板卡1",
//         status: 2
//     },
//     {
//         name: "指挥分机",
//         ip: "192.168.0.1",
//         net: "网元一",
//         card: "板卡1",
//         status: 1
//     },
//     {
//         name: "指挥分机",
//         ip: "192.168.0.1",
//         net: "网元一",
//         card: "板卡1",
//         status: 3
//     }
// ];


function deviceCell(model,index){
    const status = model.state == undefined ? NetworkStatus.STATUS_UNKNOWN : model.state;
    return <div style={{
        backgroundColor: NetworkStatus.statusColor[status].color,
        width: width,
        height: height
    }}>
        <p>{model.name}</p>
        <p>所属网元:{model.netUnitName}</p>
    </div>
}

var DeviceMonitor = React.createClass({

    componentWillMount(){
        this.props.dispatch(fetch_device());
    },

    render(){
        return(
        <div>
            <NetworkStatusBar/>
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
            netUnitName: e.netUnitName
        };
        if(deviceState.length > 0)
            device.state = deviceState[0].state;
        return device;
    });
    return {
        model: model
    }
}

export default connect(stateMap)(DeviceMonitor);