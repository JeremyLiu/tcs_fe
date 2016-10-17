import React from 'react'
import 'rc-tree-select/assets/index.css'
import {connect} from 'react-redux'
import Table from 'rc-table'
import 'rc-table/assets/index.css'
import {roleColumns, roleMenu, noDataText} from '../constant/model.js'
import {open_role_dialog, modify_role_privilege, remove_role, open_rename_dialog} from '../action/user.js'
import {open_confirm_dialog} from '../action/config.js'
import OperationTrigger from '../common/container/operationtrigger.js'
import TreeSelect from 'rc-tree-select'
import {menu} from '../constant/model.js'

var RoleManage = React.createClass({

    handleChange(row,value){
        this.props.dispatch(modify_role_privilege(row.id, value));
    },

    handleSelect(row, event){
        let {dispatch} = this.props;
        switch(event.key){
            case 'remove': dispatch(open_confirm_dialog('删除角色', '确定要删除角色'+ row.name + '么?', () => dispatch(remove_role(row.id)))); break;
            case 'modify': dispatch(open_rename_dialog(row.id,row.name));
        }
    },

    render(){
        return <div>
            <div className="form-group">
                <button type="button" className="btn btn-default"
                        onClick={()=>this.props.dispatch(open_role_dialog())}>添加角色</button>
            </div>
            <Table columns={[
                               ...roleColumns,
                               {
                                  key: 'privilege',
                                  title: '权限',
                                  dataIndex: 'privilege',
                                  width: 150,
                                  render: (value, row ,index) => <TreeSelect style = {{maxWidth: 500,minWidth:150}} transitionName="rc-tree-select-dropdown-slide-up"
                                                    choiceTransitionName="rc-tree-select-selection__choice-zoom"
                                                    dropdownStyle={{maxHeight: 300, overflow: 'auto'}}
                                                    treeData={menu}
                                                    value={value}
                                                    treeCheckable
                                                    placeholder={<i>请下拉选择</i>}
                                                    onChange={(value, arg) => this.handleChange(row,value,arg)}/>
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
                   }} emptyText={noDataText}/>
        </div>
    }
});

function stateMap(state){
    return {
        role: state.user.roles
    };
}

export default connect(stateMap)(RoleManage)