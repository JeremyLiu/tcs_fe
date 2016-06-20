import React, { Component, PropTypes } from 'react'

var GridView = React.createClass({

    getInitialState(){
      return {
          select: this.props.defaultSelect
      }
    },

    getDefaultProps(){
        return {
            gridWidth: 100,
            gridHeight: 100,
            cellSpace: 0,
            data: [],
            float: 'left',
            defaultSelect: -1,
            onClick: ()=>{},
            adapter: (model, index) => {}
        }
    },

    handleClick(model, index){
        this.setState({
            select: index
        });
        this.props.onClick(model,index);
    },

    render(){
        let gridView = this.props.data.map((model, index) => {
            return <div style={
            {
                width: this.props.gridWidth,
                height: this.props.gridHeight,
                margin: this.props.cellSpace,
                float: this.props.float
            }} className={this.state.select==index? "grid grid-select":"grid"}
            onClick={this.handleClick.bind(this, model, index)}>
                {this.props.adapter(model, index)}
                </div>
        });
        return <div className={this.props.className} style={this.props.style}>
            {gridView}
        </div>
    }

});

GridView.PropTypes={
    gridWidth: PropTypes.number.isRequired,
    gridHeight: PropTypes.number.isRequired,
    cellSpace: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    adapter: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    float: PropTypes.oneOf(['left,right'])
};

export default GridView;