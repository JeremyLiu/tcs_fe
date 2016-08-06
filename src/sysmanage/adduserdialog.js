import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import ConfigDialog from '../common/component/configdialog.js'
import Combox from '../common/component/combox.js'
import {post_add_user, post_modify_user, CLOSE_ADD_USER_DIALOG} from '../action/user.js'

var AddUserDialog = React.createClass({

    getInitialState(){
        return {
            name: this.props.name
        }
    },

    handleSave(){
        let {name} = this.state;
        let {dispatch, id} = this.props;
        let role = this.refs.role.getSelect().value;
        let password = this.refs.password.value;
        if(id<=0)
            dispatch(post_add_user(name,password,role));
        else
            dispatch(post_modify_user(id, name, role, password));
    },

    handleNameChange(event){
        this.setState({
            name: event.target.value
        });
    },

    componentWillReceiveProps(nextProps){
        if(!nextProps.visible || !this.props.visible)
            this.setState({
                name: nextProps.name
            })
    },

    render(){
        return <ConfigDialog width="450" height="200"
                             visible={this.props.visible}
                             title="添加用户"
                             onSave={this.handleSave}
                             cancelAction={{type: CLOSE_ADD_USER_DIALOG}}>
            <form className="form-horizontal"  autoComplete="off">
                <div className="form-group">
                    <label className="label-4">用户名</label>
                    <input className="form-control" type="text"
                           autoComplete="off"
                           value={this.state.name} placeholder="必填,不超过60个字符" onChange={this.handleNameChange}/>
                </div>
                <div className="form-group">
                    <label className="label-4">角色</label>
                    <Combox ref="role" className="left-float" style={{width:120}}
                            defaultValue={this.props.role<0? "选择角色": this.props.allRoles.filter(e => e.value == this.props.role)[0]}
                            model={this.props.allRoles}/>
                </div>
                <div className="form-group">
                    <label className="label-4">密码</label>
                    <input ref="password" defaultValue=""
                           autoComplete="off"
                           className="form-control" type="password"
                            placeholder={this.props.id>0? "不填则不修改":"必填,不少于6个字符且不超过60个字符"}/>
                </div>
            </form>
        </ConfigDialog>
    }
});

function stateMap(state){
    return Object.assign({},state.ui.addUserDialog,{
        allRoles: state.user.roles.map(e => {
            return {
                text: e.name,
                value: e.id
            }
        })
    });
}

export default connect(stateMap)(AddUserDialog)