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
          number: this.props.number,
          name: this.props.name,
          enable: this.props.enable
      }
    },


    componentWillReceiveProps(nextProps){
        if(!nextProps.visible || !this.props.visible)
            this.setState({
                id: nextProps.id,
                name: nextProps.name,
                enable: nextProps.enable,
                number: nextProps.number
            })
    },

    handleChange(prop,value){
        let newState = {};
        newState[prop] = value;
        this.setState(newState);
    },

    handleClick(){
        let {action, deviceId, dispatch} = this.props;
        let {enable, name, number} = this.state;
        if(action == 'create')
            dispatch(post_add_device_port(number,deviceId,name, enable));
        else
            dispatch(post_modify_device_port(this.props.id, deviceId, number, name, enable));
    },

    render(){
        let {number, name, enable} = this.state;
        return <ConfigDialog visible={this.props.visible}
                             width="350" height="200" title="添加端口配置"
                             cancelAction={close_device_port_dialog()}
                             onSave={this.handleClick}>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="label-4">端口号</label>
                    <input className="form-control" type="number" min="0" max="99999"
                           value={number}
                           placeholder="填写BCD码"
                           onChange={e=>this.handleChange('number', e.target.value)}/>
                </div>
                <div className="form-group">
                    <label className="label-4">是否启用</label>
                    <input className="left-float" type="checkbox"
                           checked={enable}
                           placeholder="填写BCD码"
                           onChange={e=>this.handleChange('enable',e.target.checked)}/>
                </div>
                <div className="form-group">
                    <label className="label-6">功能</label>
                    <input className="form-control" type="text"
                           value={name}
                           placeholder="不超过60个字符"
                           onChange={e=>this.handleChange('name', e.target.value)}/>
                </div>
            </form>
        </ConfigDialog>
    }

});

function stateMap(state){
    return state.ui.devicePortDialog;
}

export default connect(stateMap)(DevicePortDialog);