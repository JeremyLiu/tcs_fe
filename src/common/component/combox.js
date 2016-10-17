import React, { Component, PropTypes } from 'react'
import 'rc-select/assets/index.css';

var Combox = React.createClass({

    getInitialState(){
        let {defaultValue} = this.props;
        defaultValue =  this.findDefaultSelect(defaultValue);
        return {
          value: defaultValue instanceof Object ? defaultValue.text : defaultValue,
          select: defaultValue instanceof Object ? defaultValue : {}
        }
    },

    getDefaultProps(){
      return {
          disable: false,
          model: [],
          onSelect: () => {},
          placeholder: '',
          className: ''
      }
    },

    handleSelect(e,index,event){
        if(e.value != this.state.value) {
            let value = event.target.text;
            this.setState({
                value,
                select: e
            });

            this.props.onSelect(e, index);
        }
    },

    getSelect(){
        return this.state.select;
    },

    clearSelect(){
        let {defaultValue} = this.props;
        this.setState({
            value: defaultValue instanceof Object ? defaultValue.text : defaultValue,
            select: defaultValue instanceof Object ? defaultValue : {}
        });
    },

    findDefaultSelect(defaultValue){
        let {model} = this.props;
        for(var i=0 ;i< model.length;i++)
            if(defaultValue == model[i].value)
                return model[i];
        return defaultValue;
    },

    componentWillReceiveProps(nextProps){

        let change = nextProps.model.length != this.props.model.length;
        if(!change)
            for(var i=0;i<nextProps.model.length;i++)
            if(nextProps.model[i].text != this.props.model[i].text){
                change = true;
                break;
            }

        let defaultValue = nextProps.defaultValue;
        if( typeof defaultValue != typeof this.props.defaultValue ||
            (defaultValue instanceof String && defaultValue != this.props.defaultValue) ||
            (defaultValue instanceof Object && defaultValue.value != this.props.defaultValue.value)
            || change) {
            defaultValue =  this.findDefaultSelect(defaultValue);
            this.setState({
                value: defaultValue instanceof Object ? defaultValue.text : defaultValue,
                select: defaultValue instanceof Object ? defaultValue : {}
            });
        }
    },

    render(){
        return (<div className={"dropdown "+this.props.className} style={this.props.style}>
            <button ref="expand" className="btn btn-default dropdown-toggle" type="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    disabled={this.props.disable? "disabled": ""}>
                {this.state.value}
                <span className="caret"/>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                {this.props.model.map((e,index) => <li> <a onClick={this.handleSelect.bind(this,e,index)}>{e.text}</a></li>)}
            </ul>
        </div>)
    }

});

Combox.PropTypes = {
    disable: PropTypes.bool.isRequired,
    model: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
};

export default Combox;