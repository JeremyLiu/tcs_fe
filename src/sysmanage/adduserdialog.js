import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import ConfigDialog from '../common/component/configdialog.js'
import Combox from '../common/component/combox.js'
import {post_add_user, CLOSE_ADD_USER_DIALOG} from '../action/user.js'

var AddUserDialog = React.createClass({

    handleSave(){
        let {username, role, password} = this.refs;
        role = role.getSelect();
        this.props.dispatch(post_add_user(username.value,password.value,role.value));
    },

    render(){
        return <ConfigDialog width="500" height="200"
                             visible={this.props.visible}
                             title="添加用户"
                             onSave={this.handleSave}
                             cancelAction={{type: CLOSE_ADD_USER_DIALOG}}>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="label-3">用户名</label>
                    <input ref="username" className="form-control" type="text"
                           defaultValue="" placeholder="必填,不超过60个字符"/>
                </div>
                <div className="form-group">
                    <label className="label-3">角色</label>
                    <Combox ref="role" className="left-float" style={{width:120}}
                            defaultValue="选择角色"
                            model={this.props.allRoles}/>
                </div>
                <div className="form-group">
                    <label className="label-3">密码</label>
                    <input ref="password" defaultValue="" className="form-control" type="password"/>
                </div>
            </form>
        </ConfigDialog>
    }
});

function stateMap(state){
    return {
        visible: state.ui.addUserDialog.visible,
        allRoles: state.user.roles.map(e => {
            return {
                text: e.name,
                value: e.id
            }
        })
    }
}

export default connect(stateMap)(AddUserDialog)