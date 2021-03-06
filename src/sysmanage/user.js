import React from 'react'
import {connect} from 'react-redux'
import Table from 'rc-table'
import 'rc-table/assets/index.css'
import {userColumns, userMenu, noDataText} from '../constant/model.js'
import {get_all_user, open_add_user_dialog, post_remove_user} from '../action/user.js'
import {open_confirm_dialog} from '../action/config.js'
import OperationTrigger from '../common/container/operationtrigger.js'
import AddUserDialog from './adduserdialog.js'
import AddRoleDialog from './addroledialog.js'
import RenameDialog from './renamedialog.js'

var UserManage = React.createClass({
    componentWillMount(){
      this.props.dispatch(get_all_user());
    },
    handleSelect(row,event){
        let {dispatch} = this.props;
        switch(event.key){
            case 'modify': dispatch(open_add_user_dialog(row)); break;
            case 'remove': dispatch(open_confirm_dialog("删除用户",
                "确定删除用户"+row.name+"么?", ()=>dispatch(post_remove_user(row.id)))); break;
        }
    },
    render(){
        return <div>
            <div className="form-group">
                <button type="button" className="btn btn-default"
                        onClick={()=>this.props.dispatch(open_add_user_dialog())}>添加用户</button>
            </div>
            <Table columns={[
                               ...userColumns,
                               {
                                key: 'operate',
                                render: (value, row, index) => <OperationTrigger row={row} menu={userMenu} handleSelect={this.handleSelect}/>
                               }
                               ]}
                   data={this.props.user.map((e, index) => Object.assign({},e,{key:index}))} style={{
                    width: 650,
                    marginLeft: 40
                   }} emptyText={noDataText}/>
            <AddUserDialog/>
            <AddRoleDialog/>
            <RenameDialog/>
        </div>
    }
});

function stateMap(state){
    let roleMap = {};
    state.user.roles.forEach(e => roleMap[e.id] = e.name);
    return {
                user: state.user.users.map(e => {
                    return {
                        roleName: roleMap[e.roleId],
                        roleId: e.roleId,
                        name: e.name,
                        id: e.id,
                        createTime: e.createTime
                    }
                })
            };
}

export default connect(stateMap)(UserManage);