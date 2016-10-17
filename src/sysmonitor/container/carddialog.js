import 'rc-dialog/assets/index.css'
import 'rc-table/assets/index.css'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as NetStatus from '../component/networkstatusbar.js'
import GridView from '../../common/component/gridview.js'
import {REFRESH_INTERVAL, noDataText} from "../../constant/model.js"
import Table from 'rc-table'
import {fetch_card_state, set_timer} from '../../action/network.js'

const space = 3;
const width = 30;
const powerWidth = 40;
const height = 120;
const netUnitSize = 100;

const columns = [
    {
        key: "port",
        title: "端口",
        dataIndex: "port",
        width: 50
    },
    {
        key: "state",
        title: "状态",
        dataIndex: "state",
        width: 150
    }
];

function cardCell(model,index){
    const status = model.state? model.state:NetStatus.STATUS_UNKNOWN;
    let text = <p>电<br/>源<br/>单<br/>元</p>;

    return <div style={{
        backgroundColor: NetStatus.statusColor[status].color,
        width: index>0?width:powerWidth,
        fontSize: 18,
        textAlign: 'center',
        height: height,
        cursor: 'pointer'
    }}>
        {index>0?model.name:text}
    </div>
}

function cardSize(size, model, index) {
    if(index ==0){
        size.width = powerWidth;
    }
}

var CardDialog = React.createClass({

    // onCancel(){
    //     this.props.dispatch(close_card_dialog());
    // },

    getInitialState(){
      return {
          select: 0
      }
    },

    handleClick(card,index){
        this.setState({
            select: index
        });
    },

    componentWillReceiveProps(nextProps){
        let id = nextProps.netunit.id;
        let {dispatch} = this.props;
        if(nextProps.visible && !this.props.visible) {
            dispatch(fetch_card_state(id));
            dispatch(set_timer(setInterval(function () {
                dispatch(fetch_card_state(id));
            }, REFRESH_INTERVAL)));
        }
    },

    getSelect(){
        if(this.props.state.length>0)
            return this.props.state[this.state.select].portState.map((s,index) => {
                return {
                    key: index+'',
                    port: s.id,
                    state: NetStatus.statusColor[s.state].label
                }
            });
        else
            return [];
    },

    render(){
        let slotNum = 0;
        const netUnitStatus = this.props.netunit.state ?
            this.props.netunit.state:NetStatus.STATUS_UNKNOWN;

        if(this.props.card) {
            slotNum = this.props.card.length;
        }
        return (
            <div>
                <div className="center" style={{
                    width:netUnitSize,
                    height:netUnitSize,
                    margin: "10 auto",
                    textAlign: 'center',
                    lineHeight: netUnitSize+"px",
                    backgroundColor: NetStatus.statusColor[netUnitStatus].color,
                }}>{this.props.netunit.name}</div>
                    <GridView gridWidth={width} gridHeight={height} cellSpace={space}
                              adapter={cardCell} data={this.props.card}
                              sizeAdapter={cardSize}
                            onClick={this.handleClick}
                            style={{height:netUnitSize+20,
                                    width: (slotNum-1)*width+space*2*slotNum+powerWidth}}
                            className="center"/>
                <Table className="table table-bordered compact-3 center"
                       columns={columns}
                       data = {this.getSelect()}
                       style={{
                    width: 600
                }} emptyText={noDataText}/>
            </div>);
    }
});

CardDialog.PropTypes= {

};

function stateMap(state){
    return state.ui.card;
}

export default connect(stateMap)(CardDialog);