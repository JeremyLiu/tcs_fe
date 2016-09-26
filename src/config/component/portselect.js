import React from 'react'
import * as Action from '../../action/config.js'
import {CARD_TYPE_NUL} from '../../constant/model.js'
import Combox from '../../common/component/combox.js'

var PortSelect = React.createClass({

    getInitialState(){
        let {defaultSlot, defaultPort} = this.props;
        return {
            card:[],
            port:[],
            defaultSlot: defaultSlot>=0?{
                text: defaultSlot,
                value: defaultSlot
            }:'选择板卡号',
            defaultPort: defaultPort>=0?{
                text: defaultPort,
                value: defaultPort
            }:'选择端口'
        }
    },

    getDefaultProps(){
        return {
            typeFilter: -1
        }
    },

    componentWillMount(){
        let {dispatch, netunit, defaultSlot, typeFilter} = this.props;
        if(netunit>0)
            dispatch(Action.fetch_card_slot(netunit, typeFilter,
                data => {
                    let portModel = this.state.port;
                    if(defaultSlot>=0) {
                        let portCount = 0;
                        for (var i = 0; i < data.length; i++)
                            if (data[i].slot == defaultSlot) {
                                portCount = data[i].portCount;
                                break;
                            }
                        if (portCount <= 0)
                            return;
                        portModel = new Array(portCount);
                        for (i = 0; i < portCount; i++)
                            portModel[i] = {
                                text: i,
                                value: i
                            }
                    }
                    this.setState({
                        card: data.filter(e => e.code != CARD_TYPE_NUL).map((e, index) => {
                            return {
                                text: e.slot,
                                value: e.slot,
                                index: index,
                                portCount: e.portCount
                            }
                        }),
                        port: portModel
                    })
                }));


    },

    componentWillReceiveProps(nextProps){
        let {dispatch, netunit, defaultSlot, defaultPort, typeFilter} = nextProps;
        if(netunit > 0 && netunit!=this.props.netunit)
            dispatch(Action.fetch_card_slot(netunit, typeFilter,
                data => {

                    this.setState({
                        card: data.filter(e => e.code != CARD_TYPE_NUL).map((e, index) => {
                            return {
                                text: e.slot,
                                value: e.slot,
                                index: index,
                                portCount: e.portCount
                            }
                        }),
                        port: []
                    })
                }));
        if(defaultSlot!=this.props.defaultSlot || defaultPort!=this.props.defaultPort)
            this.setSelect(defaultSlot, defaultPort);
    },

    handleSelectSlot(value){
        let portNum = this.state.card[value.index].portCount;
        let port = new Array(portNum);
        for(var i = 0; i< portNum; i++)
            port[i] = {
                text: i,
                value: i
            }
        this.setState({
            port: port,
            defaultPort: '选择端口'
        });
    },

    getSelect(){
        let {slot, port} = this.refs;
        return {
            slot: slot.getSelect().value,
            port: port.getSelect().value
        }
    },

    setSelect(slot, port){
        let portModel = this.state.port;
        if(slot>=0) {
            let portCount = 0;
            for (var i = 0; i < this.state.card.length; i++)
                if (this.state.card[i].value == slot) {
                    portCount = this.state.card[i].portCount;
                    break;
                }
            if (portCount <= 0)
                return;
            portModel = new Array(portCount);
            for (i = 0; i < portCount; i++)
                portModel[i] = {
                    text: i,
                    value: i
                }
        }

        this.setState({
            defaultSlot: slot>=0?{
                text: slot,
                value: slot
            }:'选择板卡号',
            defaultPort: port>=0?{
                text: port,
                value: port
            }:'选择端口',
            port: portModel
        })
    },
    
    clearData(){
        let {slot, port} = this.refs;
        slot.clearSelect();
        port.clearSelect();
    },

    render(){
        let {defaultSlot, defaultPort} = this.state;
        return <form className="form-inline">
                <Combox ref="slot" className="left-float" style={{width:120}}
                        defaultValue={defaultSlot} model={this.state.card} onSelect={this.handleSelectSlot}/>
                <Combox ref="port" className="left-float" style={{width:120}}
                        defaultValue={defaultPort} model={this.state.port}/>
            </form>
    }
});

export default PortSelect;