import React, { Component, PropTypes } from 'react'
import SwitchView from './switchview.js'
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import 'rc-menu/assets/index.css';
var MenuTab = React.createClass({

    handleClick(event){
        let index = 0;
        for(var i=0; i< this.props.tabs.length; i++)
            if(this.props.tabs[i].key == event.key){
                index = i;
                break;
            }
        if(this.props.onClick)
            this.props.onClick(index,event);
        this.refs.switchView.setState({
           active: index
        });
    },

    render(){

        return (
            <div>
                <Menu ref="menu" className="left-float hover" model={this.props.mode} onClick={this.handleClick}>
                    {this.props.tabs.map((e) => {
                        return <MenuItem key={e.key}>
                            {e.text}
                        </MenuItem>
                    })}
                </Menu>
                <SwitchView className="left-float wrap-width" ref="switchView">
                    {this.props.children}
                </SwitchView>
                </div>);
    }
});

MenuTab.PropTypes = {
    mode: PropTypes.string.isRequired,
    tabs: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
};

export default MenuTab;