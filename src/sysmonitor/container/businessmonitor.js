import React from 'react'
import {connect} from 'react-redux'
import Table from 'rc-table'
import 'rc-table/assets/index.css'
import SwitchView from '../../common/component/switchview.js'
import {businessBriefColumn, businessColumns} from '../../constant/model.js'
import {fetch_business, fetch_busisness_data} from '../../action/network.js'

const columns = [
    {
        key: "id",
        title: "序号",
        dataIndex: "id",
        width: 50
    },
    {
        key: "type",
        title: "业务类型",
        dataIndex: "type",
        width: 200,
        render: (value, row, index) => <img src={row.type}/>
    },
    {
        key: "calling_number",
        title: "主叫号码",
        dataIndex: "calling_number",
        width: 150
    },
    {
        key: "called_number",
        title: "被叫号码",
        dataIndex: "called_number",
        width: 150
    }
];

const data = [
    {
        key:1,
        id: 1,
        type: "../img/business_type.png",
        calling_number: "123456789",
        called_number: "123456789"
    },
    {
        key:2,
        id:2,
        type: "../img/business_type.png",
        calling_number: "123456789",
        called_number: "123456789"
    }
];

var BusinessMonitor = React.createClass({
    
    switchView(record){
        let {dispatch} = this.props;
        dispatch(fetch_busisness_data(record.type));
    },
    render(){
       return (
       <div>
           <div>
               <button style={{display:this.props.visible?'inline-block':'none',
                                    marginLeft: 40}}
                       className="btn btn-default left-float"
                       onClick={() => this.props.dispatch(fetch_business())}>返回</button>
           </div>
           <SwitchView active={this.props.visible?1:0}>
               <Table className="table table-bordered compact-3"
                      columns={businessBriefColumn}
                      data={this.props.brief.map((e,index) => Object.assign({},e,{key: index}))}
                      style={{
                        width: 600
                        }}
                      onRowClick={this.switchView}
               />
               <div>
                   <Table className="table table-bordered compact-3"
                          columns={businessColumns[this.props.curDetail]}
                          data={this.props.detail.map((e,index) => Object.assign({},e,{key: index}))}
                          style={{
                    width: 600
                    }}/>
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
