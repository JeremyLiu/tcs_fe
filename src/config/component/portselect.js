import React from 'react'
import * as Action from '../../action/config.js'
import {CARD_TYPE_NUL} from '../../constant/model.js'
import Combox from '../../common/component/combox.js'

function defaultPortGenerate(card){
    let port = new Array(card.portCount);
    for(var i = 0; i< card.portCount; i++)
        port[i] = {
            text: i,
            value: i
        }
    return port;
}

function defaultCardFilter(e){
    return e.code != CARD_TYPE_NUL;
}

var PortSelect = React.createClass({

    getInitialState(){
        let {defaultSlot, defaultPort, cardLabel, portLabel} = this.props;
        return {
            card:[],
            port:[],
            defaultSlot: defaultSlot>=0?{
                text: defaultSlot,
                value: defaultSlot
            }:cardLabel,
            defaultPort: defaultPort>=0?{
                text: defaultPort,
                value: defaultPort
            }:portLabel
        }
    },

    getDefaultProps(){
        return {
            typeFilter: -1,
            portGenerate: defaultPortGenerate,
            cardFilter: defaultCardFilter,
            cardLabel: '选择板卡号',
            portLabel: '选择端口'
        }
    },

    componentWillMount(){
        let {dispatch, netunit, defaultSlot,
            typeFilter,cardFilter, portGenerate} = this.props;
        if(netunit>0)
            dispatch(Action.fetch_card_slot(netunit, typeFilter,
                data => {
                    let portModel = this.state.port;
                    if(defaultSlot>=0) {
                        let card;
                        for (var i = 0; i < data.length; i++)
                            if (data[i].slot == defaultSlot) {
                                card = data[i];
                                break;
                            }
                        if(card)
                            portModel = portGenerate(card);
                        else
                            return;
                    }

                    let cards = data.filter(cardFilter).map((e, index) => {
                        return {
                            text: e.slot,
                            value: e.slot,
                            index: index,
                            portCount: e.portCount,
                            code: e.code
                        }
                    });

                    this.setState({
                        card: cards,
                        port: portModel
                    })
                }));


    },

    componentWillReceiveProps(nextProps){
        let {dispatch, netunit, defaultSlot,
            defaultPort, typeFilter, cardFilter} = nextProps;
        if(netunit > 0 && netunit!=this.props.netunit)
            dispatch(Action.fetch_card_slot(netunit, typeFilter,
                data => {
                    let cards = data.filter(cardFilter).map((e, index) => {
                        return {
                            text: e.slot,
                            value: e.slot,
                            index: index,
                            portCount: e.portCount,
                            code: e.code
                        }
                    });

                    this.setState({
                        card: cards,
                        port: []
                    })
                }));
        let {slot, port} = this.getSelect();
        if(defaultSlot!=slot || defaultPort!=port)
            this.setSelect(defaultSlot, defaultPort);
    },

    handleSelectSlot(value){
        let port = this.props.portGenerate(this.state.card[value.index]);
        this.setState({
            port: port,
            defaultPort: this.props.portLabel
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
            }:this.props.cardLabel,
            defaultPort: port>=0?{
                text: port,
                value: port
            }:this.props.portLabel,
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