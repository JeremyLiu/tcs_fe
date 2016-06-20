import 'rc-dialog/assets/index.css'
import 'rc-input-number/assets/index.css'
import React, {Component, PropTypes} from 'react'
import * as Action from '../../action/config.js'
import {refresh_config} from '../../action/config.js'
import {connect} from 'react-redux'
import Dialog from 'rc-dialog'
import InputNumber from 'rc-input-number'

var ElementDialog = React.createClass({

    getInitialState(){
      return {
          cardCount: this.props.cardCount,
          ip: this.props.ip,
          name: this.props.name
      }
    },

    componentWillReceiveProps(nextProps){
        this.setState({
            cardCount: nextProps.cardCount,
            ip: nextProps.ip,
            name: nextProps.name
        })
    },

    onSave(e){
        let element = {
            name : this.state.name,
            ip: this.state.ip,
            id: this.props.id,
            cardCount: this.state.cardCount
        };
        if(this.props.action == 'create')
            this.props.dispatch(Action.add_element(element,()=>{
                this.props.dispatch(Action.cancel_add_element());
                this.props.dispatch(refresh_config());
            }));
        else
            this.props.dispatch(Action.modify_element(element))
    },

    onCancel(e){
        this.props.dispatch(Action.cancel_add_element());
    },

    handleCardCountChange(value){
        this.setState({
            cardCount: value
        });
    },

    handleNameChange(event){
        this.setState({
            name: event.target.value
        });
    },

    handleIpChange(event){
        this.setState({
            ip: event.target.value
        })
    },

    render(){
        return(
            <Dialog
            visible={this.props.visible}
            animation="slide-fade"
            maskAnimation="fade"
            style={{ width: 500, height: 200}}
            onClose={this.onCancel}
            title={<div>新建网元</div>}
            footer={
            [
              <button
                type="button"
                className="btn btn-default"
                key="close"
                onClick={this.onCancel}
              >
              关闭
              </button>,
              <button
                type="button"
                className="btn btn-primary"
                key="save"
                onClick={this.onSave}
              >
              保存
              </button>
            ]
          }>
              <form className="form-horizontal">
                  <div className="form-group">
                      <label className="label-3">名称</label>
                      <input className="form-control" type="text"
                             value={this.state.name}
                             placeholder="必填,不超过60个字符"
                             onChange={this.handleNameChange}/>
                  </div>
                  <div className="form-group">
                      <label className="label-3">ip地址</label>
                      <input className="form-control" type="text"
                             value={this.state.ip}
                             placeholder="必填,格式如192.168.0.1"
                             onChange={this.handleIpChange}/>
                  </div>

                  <div className="form-group">
                      <label className="label-3">板卡数目</label>
                      <div className="left-float">
                          <InputNumber defaultValue={this.props.cardCount}
                                       value={this.state.cardCount}
                                       style={{width: 60}}
                                       readOnly={true}
                                       min={3} max={20}
                                        onChange={this.handleCardCountChange}/>
                      </div>
                  </div>
              </form>
            </Dialog>
        )
    }
});

ElementDialog.PropTypes = {
    visible: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    cardCount: PropTypes.number.isRequired
};

function stateMap(state){
    return state.ui.element;
}

export default connect(stateMap)(ElementDialog);