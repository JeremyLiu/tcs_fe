import React, { PropTypes } from 'react'
import Menu,{Item as MenuItem, Divider} from 'rc-menu'

var PopupMenu = React.createClass({

    getDefaultProps(){
      return {
          model: [],
          onItemClick: ()=>{}
      }
    },

    getInitialState(){
      return {
          x:0,
          y:0,
          visible:false
      }
    },

    handleClick(e){
        this.popoff();
        this.props.onItemClick(e.key,e.item,e.event);
    },

    render(){
        return (
            <div style={{left:this.state.x,
                    top:this.state.y,
                    display: this.state.visible?'inline-block':'none',
                    backgroundColor: 'white',
                    zIndex: 2,
                    position: 'absolute'}}>
                <Menu className="hover" onClick={this.handleClick}>
                    {this.props.model.map((e) => {
                        return <MenuItem key={e.key}>
                                    {e.text}
                                </MenuItem>
                    })}
                </Menu>
            </div>
        )
    },

    popup(x,y){
        this.setState({
            visible: true,
            x: x,
            y: y
        })
    },

    popoff(){
      this.setState({
          visible: false
      })
    }

});

PopupMenu.PropTypes = {
    model: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired
};

export default PopupMenu;