import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {close_device_dialog, post_add_device, post_modify_device} from '../../action/config.js'
import ConfigDialog from '../../common/component/configdialog.js'
import Combox from '../../common/component/combox.js'

var DeviceDialog = React.createClass({

    getInitialState(){
        return {
            name: this.props.name
        };
    },

    componentWillReceiveProps(nextProps){
        if(!nextProps.visible || !this.props.visible)
            this.setState({
                name: nextProps.name
            })
    },

    handleSelect(){

    },

    handleClick(){
        let netunit = this.refs.netunit.getSelect();
        if(this.props.action == 'create')
            this.props.dispatch(post_add_device(netunit.value,this.state.name,netunit.text));
        else
            this.props.dispatch(post_modify_device(this.props.id,netunit.value, this.state.name,netunit.text));
    },

    handleNameChange(event){
        this.setState({
            name: event.target.value
        })
    },

    render(){
        return <ConfigDialog visible={this.props.visible}
                             width="450" height="350" title="添加设备"
                             cancelAction={close_device_dialog()}
                             onSave={this.handleClick}
                            >
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="label-4">所属网元</label>
                    <Combox ref="netunit" className="left-float" style={{width:120}}
                            defaultValue={this.props.netunit<=0?"选择网元":
                            this.props.allNetUnit.filter(e => e.value == this.props.netunit)[0]}
                            model={this.props.allNetUnit}
                            onSelect={this.handleSelect}/>
                </div>
                <div className="form-group">
                    <label className="label-4">名称</label>
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
    let netunit = state.netUnitConfig.device.map(e => {
        return {
            value: e.id,
            text: e.name
        }
    });
    return Object.assign({},state.ui.deviceDialog,{allNetUnit:netunit});
}

export default connect(stateMap)(DeviceDialog);