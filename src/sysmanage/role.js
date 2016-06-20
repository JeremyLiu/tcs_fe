import React from 'react'
import 'rc-tree-select/assets/index.css'
import {connect} from 'react-redux'
import Table from 'rc-table'
import 'rc-table/assets/index.css'
import {roleColumns, roleMenu} from '../constant/model.js'
import {open_role_dialog} from '../action/user.js'
import OperationTrigger from '../common/container/operationtrigger.js'
import TreeSelect from 'rc-tree-select'
import {menu} from '../constant/model.js'

var RoleManage = React.createClass({

    render(){
        return <div>
            <div className="form-group">
                <button type="button" className="btn btn-default"
                        onClick={()=>this.props.dispatch(open_role_dialog())}>添加角色</button>
            </div>
            <Table columns={[
                               ...roleColumns,
                               {
                                  key: 'permission',
                                  title: '权限',
                                  width: 150,
                                  render: (value, row ,index) => <TreeSelect style = {{maxWidth: 500,minWidth:150}} transitionName="rc-tree-select-dropdown-slide-up"
                                                    choiceTransitionName="rc-tree-select-selection__choice-zoom"
                                                    dropdownStyle={{maxHeight: 300, overflow: 'auto'}}
                                                    treeData={menu}
                                                    treeCheckable
                                                    placeholder={<i>请下拉选择</i>}/>
                               },
                               {
                                key: 'operate',
                                width: 100,
                                render: (value, row, index) => <OperationTrigger row={row} menu={roleMenu} handleSelect={this.handleSelect}/>
                               }
                               ]}
                   data={this.props.role.map((e, index) => Object.assign({},e,{key:index}))} style={{
                    minWidth: 400,
                    marginLeft: 40
                   }}/>
        </div>
    }
});

function stateMap(state){
    return {
        role: state.user.roles
    };
}

export default connect(stateMap)(RoleManage)