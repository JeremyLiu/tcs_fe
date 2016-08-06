import 'rc-dialog/assets/index.css'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Dialog from 'rc-dialog'
import {set_error_text} from '../../action/response.js'

var ConfigDialog = React.createClass({

    getInitialState(){
        return {
            errorText: this.props.errorText
        }
    },

    onCancel(e){
        this.props.dispatch(this.props.cancelAction);
        this.props.dispatch(set_error_text(''));
    },

    componentWillReceiveProps(nextProps){
        this.setState({
            errorText: nextProps.errorText
        })
    },

    onSave(e){
        this.props.dispatch(set_error_text(''));
        this.props.onSave(e);
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
                onClick={this.onSave}
              >
              保存
              </button>
            ]
          }>
                <div style={{display: this.state.errorText == ''?'none':'block'}} className="error-wrap alert-danger" role="alert">{this.state.errorText}</div>
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

function stateMap(state){
    return state.ui.error;
}

export default connect(stateMap)(ConfigDialog);