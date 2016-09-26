import 'rc-dialog/assets/index.css'
import 'rc-select/assets/index.css'
import 'rc-table/assets/index.css'
import React, {PropTypes} from 'react'
import * as Action from '../../action/config.js'
import * as NetStatus from '../../sysmonitor/component/networkstatusbar.js'
import {connect} from 'react-redux'
import Table from 'rc-table'
import Combox from '../../common/component/combox.js'
import {noDataText} from '../../constant/model.js'


var CardConfig = React.createClass({

    handleClick(e){
        let {dispatch, netunit} = this.props;
        dispatch(Action.open_confirm_dialog('下载板卡配置','确定要下载'+netunit.name+'的板卡配置吗?'), () => {
            dispatch(Action.close_confimr_dialog());
            dispatch(Action.set_loading(true,'正在配置'+netunit.name+'的板卡'));
            dispatch(Action.download_card(netunit.id));
        })
    },

    render(){
        return <div>
            <button style={{marginLeft: 30}}className="btn btn-default left-float" onClick={() => this.props.dispatch(Action.close_card_config())}>返回</button>
            <button className="btn btn-default left-float compact-inline" disabled={!this.props.canDownload} onClick={this.handleClick}>下载配置</button>
            <h3>{this.props.netunit.name+"的板卡配置"}</h3>
            <div style={{padding: '0 30%'}}>
                <Table className="table table-bordered compact-3" style={{overflow:'auto'}}
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
                       data={this.props.model} emptyText={noDataText}/>
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

    let netunit = state.ui.cardConfig.netunit;

    return {
        model: card,
        netunit: netunit,
        cardType: cardType,
        canDownload: netunit.state == NetStatus.STATUS_NORMAL
            || netunit.state == NetStatus.STATUS_ERROR
    };
}

export default connect(stateMap)(CardConfig);