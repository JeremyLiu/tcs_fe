import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {post_add_device_port, 
    post_modify_device_port,
    close_device_port_dialog} from '../../action/config.js'
import ConfigDialog from '../../common/component/configdialog.js'

var DevicePortDialog = React.createClass({

    getInitialState(){
      return {
          id: this.props.id,
          name: this.props.name
      }
    },


    componentWillReceiveProps(nextProps){
        this.setState({
            id: nextProps.id,
            name: nextProps.name
        })
    },

    handlePortChange(event){
      this.setState({
         id: event.target.value
      });
    },

    handleNameChange(event){
      this.setState({
          name: event.target.value
      })
    },

    handleClick(){
        let {action, deviceId, dispatch} = this.props;
        let {id, name} = this.state;
        if(action == 'create')
            dispatch(post_add_device_port(parseInt(id),deviceId,name));
        else
            dispatch(post_modify_device_port(this.props.id, deviceId, parseInt(id), name));
    },

    render(){
        return <ConfigDialog visible={this.props.visible}
                             width="400" height="200" title="添加端口配置"
                             cancelAction={close_device_port_dialog()}
                             onSave={this.handleClick}>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="label-3">端口号</label>
                    <input className="form-control" type="text"
                           value={this.state.id}
                           placeholder="必填,数字"
                           onChange={this.handlePortChange}/>
                </div>
                <div className="form-group">
                    <label className="label-3">功能</label>
                    <input className="form-control" type="text"
                           value={this.state.name}
                           placeholder="必填,不超过60个字符"
                           onChange={this.handleNameChange}/>
                </div>
            </form>
        </ConfigDialog>
    }

});

function stateMap(state){
    return state.ui.devicePortDialog;
}

export default connect(stateMap)(DevicePortDialog);