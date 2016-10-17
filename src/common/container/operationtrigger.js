import 'rc-menu/assets/index.css'
import 'rc-trigger/assets/index.css'
import React, {PropTypes} from 'react'
import Trigger from 'rc-trigger'
import Menu, {Item as MenuItem, Divider}from 'rc-menu'

var OperationTrigger = React.createClass({

    getDefaultProps(){
      return {
          menu: [],
          handleSelect: () => {}
      }
    },

    handleSelect(event){
        let {row,handleSelect} = this.props;
        handleSelect(row,event);
    },

    render(){
        return <Trigger popupAlign={{points: ['tl', 'bl']}}
                        popoupTransitionName="rc-trigger-popup-zoom"
                        action={['hover']}
                        popup={<div style={{display: 'inline-block', backgroundColor:'white'}}>
                        <Menu className="hover" onClick={this.handleSelect}>
                                    {this.props.menu.map((e, index)  => <MenuItem key={e.key}>{e.text}</MenuItem>)}
                                </Menu>
                                </div>}>
            <button className="btn btn-default">操作</button>
        </Trigger>;
    }

});

OperationTrigger.PropTypes ={
    menu: PropTypes.array.isRequired,
    handleSelect: PropTypes.func.isRequired
};

export default OperationTrigger;