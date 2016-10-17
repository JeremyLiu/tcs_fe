import React from 'react'
import {connect} from 'react-redux'
import {get_api} from '../../action/network.js'
import notify from '../../common/component/notification.js'
const INIT = 0;
const REFRESH = 1;

var RefreshButton = React.createClass({

    getInitialState(){
        return {
            action: INIT
        }
    },

    getDefaultProps(){
      return {
          className: '',
          api: '',
          style: {}
      }
    },

    handleClick(){
        let {api, dispatch} = this.props;
        this.setState({
            action: REFRESH
        });
        dispatch(get_api(api, data =>{
            this.setState({
                action: INIT
            });
            if(data.status == 0)
                notify('刷新成功');
            else
                notify(data.message, 5);
        }))
    },

    render(){
        let {action} = this.state;
        let {className, style} = this.props;
        return <button className={"btn btn-default "+className}
                       disabled={action==REFRESH?'disabled':''}
                       style={style} onClick={this.handleClick}>
            {action==REFRESH?"正在刷新":"刷新"}
        </button>
    }
});

export default connect()(RefreshButton);