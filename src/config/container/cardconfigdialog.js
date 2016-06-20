import 'rc-dialog/assets/index.css'
import 'rc-select/assets/index.css'
import 'rc-table/assets/index.css'
import React, {PropTypes} from 'react'
import * as Action from '../../action/config.js'
import {connect} from 'react-redux'
import GridView from '../../common/component/gridview.js'
import Dialog from 'rc-dialog'
import Table from 'rc-table'
import Combox from '../../common/component/combox.js'
import {rangeArray} from '../../constant/model.js'

const space = 5;
const width = 30;
const height = 120;
const netUnitSize = 100;

function cardCell(model,index){
    return <div style={{
        backgroundColor: 'lightgrey',
        width: width,
        fontSize: 18,
        textAlign: 'center',
        height: height,
        cursor: 'pointer'
    }}>
        {model.name}
    </div>
}

var CardConfigDialog = React.createClass({
    onCancel(){
        this.props.dispatch(Action.close_card_config());
    },

    handleClick(card,index){
        this.props.dispatch(Action.select_card_config(index));
    },

    render(){

        return (
            <Dialog
                visible={this.props.visible}
                animation="slide-fade"
                maskAnimation="fade"
                style={{ width: 800}}
                onClose={this.onCancel}
                title={<div>{this.props.netunit.name+"的板卡配置"}</div>}
                footer={[
                  <button
                      type="button"
                      className="btn btn-default"
                      key="close"
                      onClick={this.onCancel}
                  >
                      关闭
                  </button>,
                    <button
                        type="button"
                        className="btn btn-primary"
                        key="save"
                        onClick={this.props.onSave}
                    >
                        保存
                    </button>
                ]}>
                <GridView gridWidth={width} gridHeight={height} cellSpace={space}
                          adapter={cardCell} data={this.props.card}
                          onClick={this.handleClick}
                          style={{height:netUnitSize+20}}
                          className="center"/>
                <div>
                    <div className="btn-group">
                        <Combox defaultValue={this.props.selectType.name} model={this.props.cardType}
                                defaultSelect = {0}
                            onSelect = {value => this.props.dispatch(Action.set_card_type(value.value,value.text))}/>
                    </div>
                </div>
            </Dialog>);
   }
});

CardConfigDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    card: PropTypes.array.isRequired,
    device: PropTypes.array.isRequired
};

function stateMap(state) {
    let card = state.ui.cardConfig.card;
    let select = state.ui.cardConfig.select;
    let cardType =  state.constant.cardTypes.map(e=> {
        return {
            value: e.code,
            text: e.name,
            portCount: e.portCount
        }
    });
    let curType = card.length>0?state.constant.cardTypes.filter(e => e.code == card[select].type)[0]:{name:"",portCount:0};
    return {
        visible: state.ui.cardConfig.visible,
        card: card,
        netunit: state.ui.cardConfig.netunit,
        device: (select>=0 && select<card.length)? card[select].devices: [],
        selectType: curType,
        cardType: cardType
    };
}

export default connect(stateMap)(CardConfigDialog);