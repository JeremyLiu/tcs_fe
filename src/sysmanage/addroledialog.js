import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import ConfigDialog from '../common/component/configdialog.js'
import {menu} from '../constant/model.js'
import TreeSelect from 'rc-tree-select'
import {post_add_role, CLOSE_ROLE_DIALOG} from '../action/user.js'

var AddRoleDialog = React.createClass({

    getInitialState(){
        return {
            privilege:[]
        }
    },

    handleSave(){
        let {dispatch} = this.props;
        dispatch(post_add_role(this.refs.name.value, this.state.privilege));
    },

    handleSelect(value){
        this.setState({
            privilege: value
        });
    },

    render(){
        return <ConfigDialog width="450" height="300"
                             visible={this.props.visible}
                             title="添加角色"
                             onSave={this.handleSave}
                             cancelAction={{type:CLOSE_ROLE_DIALOG}}>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="label-4">角色名</label>
                    <input ref="name" className="form-control" type="text"
                           defaultValue="" placeholder="必填,不超过60个字符"/>
                </div>
                <div className="form-group">
                    <label className="label-3">权限</label>
                    <TreeSelect style = {{maxWidth: 250,minWidth:150}} transitionName="rc-tree-select-dropdown-slide-up"
                                choiceTransitionName="rc-tree-select-selection__choice-zoom"
                                dropdownStyle={{maxHeight: 300, overflow: 'auto', zIndex: 2000}}
                                treeData={menu}
                                value={this.state.privilege}
                                treeCheckable
                                placeholder={<i>请下拉选择</i>}
                                onChange={this.handleSelect}/>
                </div>
            </form>
        </ConfigDialog>
    }
});

function stateMap(state){
    return {
        visible: state.ui.roleDialog.add
    }
}

export default connect(stateMap)(AddRoleDialog)