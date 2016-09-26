import React from 'react'
import {connect} from 'react-redux'
import Table from 'rc-table'
import 'rc-table/assets/index.css'
import SwitchView from '../../common/component/switchview.js'
import {businessBriefColumn, businessColumns,
    REFRESH_INTERVAL, noDataText} from '../../constant/model.js'
import {fetch_business, fetch_business_data, show_business_detail, set_timer} from '../../action/network.js'

var BusinessMonitor = React.createClass({
    
    switchView(record){
        let {dispatch} = this.props;
        dispatch(fetch_business_data(record.type));
        dispatch(show_business_detail(true));
        dispatch(set_timer(setInterval(function () {
            dispatch(fetch_business_data(record.type));
        }, REFRESH_INTERVAL)));
    },

    returnView(){
        let {dispatch} = this.props;
        dispatch(fetch_business());
        dispatch(show_business_detail(false));
        dispatch(set_timer(setInterval(function () {
            dispatch(fetch_business());
        }, REFRESH_INTERVAL)));
    },

    render(){
       return (
       <div>
           <div>
               <button style={{display:this.props.visible?'inline-block':'none',
                                    marginLeft: 40}}
                       className="btn btn-default"
                       onClick={this.returnView}>返回</button>
           </div>
           <SwitchView active={this.props.visible?1:0}>
               <Table className="table table-bordered compact-3"
                      columns={businessBriefColumn}
                      data={this.props.brief.map((e,index) => Object.assign({},e,{key: index}))}
                      style={{
                        width: 600
                        }}
                      onRowClick={this.switchView}
                      emptyText={noDataText}
               />
               <div>
                   <Table className="table table-bordered compact-3"
                          columns={businessColumns[this.props.curDetail]}
                          data={this.props.detail.map((e,index) => Object.assign({},e,{key: index+1}))}
                          style={{
                            width: 600
                            }}
                          emptyText={noDataText}/>
               </div>
           </SwitchView>
       </div>
    
    
       )
    }
});

function stateMap(state){
    return state.business;
}

export default connect(stateMap)(BusinessMonitor);
