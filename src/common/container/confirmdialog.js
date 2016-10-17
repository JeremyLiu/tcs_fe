import 'rc-dialog/assets/index.css'
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Dialog from 'rc-dialog'
import {CLOSE_CONFIRM_DIALOG} from '../../action/config.js'

var ConfirmDialog = React.createClass({

    onCancel(){
      this.props.dispatch({type: CLOSE_CONFIRM_DIALOG})
    },

    render(){
        return <Dialog visible={this.props.visible}
               animation="slide-fade"
               maskAnimation="fade"
               style={{ width: 300, height: 180}}
               onClose={this.onCancel}
               title={<div>{this.props.title}</div>}
               footer={[
                  <button
                      type="button"
                      className="btn btn-default compact-inline"
                      key="close"
                      onClick={this.onCancel}
                  >
                      取消
                  </button>,
                    <button
                        type="button"
                        className="btn btn-primary"
                        key="save"
                        onClick={this.props.onConfirm}
                    >
                        保存
                    </button>
                ]}>
            <p style={{margin: 20}}>{this.props.content}</p>
        </Dialog>
    }
});

function stateMap(state){
    return state.ui.confirmDialog;
}

export default connect(stateMap)(ConfirmDialog);