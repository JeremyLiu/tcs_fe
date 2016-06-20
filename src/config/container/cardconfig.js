import 'rc-dialog/assets/index.css'
import 'rc-select/assets/index.css'
import 'rc-table/assets/index.css'
import React, {PropTypes} from 'react'
import * as Action from '../../action/config.js'
import {connect} from 'react-redux'
import Table from 'rc-table'
import Combox from '../../common/component/combox.js'


var CardConfig = React.createClass({

    render(){
        return <div>
            <button style={{marginLeft: 30}}className="btn btn-default left-float" onClick={() => this.props.dispatch(Action.close_card_config())}>返回</button>
            <h3>{this.props.title}</h3>
            <div style={{padding: '0 30%'}}>
                <Table className="table table-bordered compact-3"
                       columns={[
                            {
                                key:'id',
                                title: "板卡号",
                                render: (value,row,index) => index+1,
                                width: 80
                            },
                            {
                                key:'type',
                                title: "类型",
                                render: (value,row,index) => {
                                    return <Combox model={this.props.cardType}
                                    defaultValue={row.name}
                                    onSelect={value => this.props.dispatch(Action.post_modify_card_type(row.id,value.value,value.text))}/>
                                },
                                width: 150
                            }
                        ]}
                       data={this.props.model}/>
            </div>
        </div>
    }

});


function stateMap(state){
    let card = state.ui.cardConfig.card;
    card.forEach((c) => c.key=c.id);
    let cardType =  state.constant.cardTypes.map(e=> {
        return {
            value: e.code,
            text: e.name,
            portCount: e.portCount
        }
    });

    return {
        model: card,
        title: state.ui.cardConfig.netunit.name+"的板卡配置",
        cardType: cardType
    };
}

export default connect(stateMap)(CardConfig);