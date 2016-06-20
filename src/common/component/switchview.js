import React, { PropTypes } from 'react'
import { TabPane } from 'rc-tabs'

var SwitchView = React.createClass({

    getInitialState(){
        return {
            active: 0
        }
    },

    setActive(active){
        this.setState({
            active: active
        })
    },

    componentWillReceiveProps(nextProps){
      this.setActive(nextProps.active);
    },

    render(){
        if(this.props.children.length==0)
            return null;

        return <div className={this.props.className}>
            {this.props.children.map((child, index) =>
                <TabPane active={index==this.state.active} rootPrefixCls="rc-tabs">
                    {child}
                </TabPane>
            )}
            </div>
    }
});

export default SwitchView;