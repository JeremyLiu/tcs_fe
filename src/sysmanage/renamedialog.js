import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import ConfigDialog from '../common/component/configdialog.js'
import {CLOSE_RENAME_DIALOG, modify_role_name} from '../action/user.js'

var RenameDialog = React.createClass({

    getInitialState(){
        return {
            name: this.props.name
        }
    },

    componentWillReceiveProps(nextProps){
        this.setState({
            name: nextProps.name
        })
    },
    handleChange(event){
        this.setState({
            name: event.target.value
        })
    },

    handleSave(){
        let {dispatch, id} = this.props;
        dispatch(modify_role_name(id, this.state.name));
    },

    render(){
        return <ConfigDialog width="400" height="450"
                             visible={this.props.visible}
                             title="重命名"
                             onSave={this.handleSave}
                             cancelAction={{type: CLOSE_RENAME_DIALOG}}>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="label-6">名称</label>
                    <input className="form-control" type="text"
                           value={this.state.name} placeholder="不超过60个字符"
                            onChange={this.handleChange}/>
                </div>
            </form>
        </ConfigDialog>
    }
});

function stateMap(state){
    return {
        visible: state.ui.roleDialog.modify,
        name: state.ui.roleDialog.name,
        id: state.ui.roleDialog.id
    }
}

export default connect(stateMap)(RenameDialog)