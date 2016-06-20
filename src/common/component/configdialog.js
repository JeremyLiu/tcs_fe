import 'rc-dialog/assets/index.css'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Dialog from 'rc-dialog'

var ConfigDialog = React.createClass({

    onCancel(e){
        this.props.dispatch(this.props.cancelAction);
    },

    render(){
        return(
            <Dialog
                visible={this.props.visible}
                animation="slide-fade"
                maskAnimation="fade"
                style={{ width: this.props.width, height: this.props.height}}
                onClose={this.onCancel}
                title={<div>{this.props.title}</div>}
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
                onClick={this.props.onSave}
              >
              保存
              </button>
            ]
          }>
                {this.props.children}
            </Dialog>
        )
    }
});

ConfigDialog.PropTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
};


export default connect()(ConfigDialog);