import React, { Component, PropTypes } from 'react'

var name_count = 0;

var RadioGroup = React.createClass({

    getDefaultProps(){
        name_count++;
        return {
            name: 'rc-radio-group-'+name_count,
            data: [],
            defaultSelect: 0
        }
    },

    getSelect(){
        return this.select;
    },

    componentDidMount(){
        if(this.props.data.length>0)
            this.select = this.props.data[this.props.defaultSelect];
        else
            this.select = {};
    },

    componentWillMount(){
        if(this.props.defaultSelect>=this.props.data.length || this.props.defaultSelect <0){
            this.props.defaultSelect = 0;
        }
    },

    handleChange(model,index){
        this.select = model;
        if(this.props.selectChanged)
            this.props.selectChanged(model,index);
    },

    render(){
        let radios;
        if(this.props.data){
            radios = this.props.data.map((model,index) => {
                return  <span>
                            <input  name={this.props.name}
                                    onClick={this.handleChange.bind(this,model,index)}
                                    type="radio"
                                    defaultChecked={index == this.props.defaultSelect? "checked":""}
                                    />
                            <label>{model.text}</label>
                        </span>
            });
        }
        return <div className="radio-group">
            {radios}
        </div>
    }
});

RadioGroup.PropTypes={
    name: PropTypes.string.isRequired,
    defaultSelect: PropTypes.number.isRequired,
    selectChanged: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
};

export default RadioGroup;