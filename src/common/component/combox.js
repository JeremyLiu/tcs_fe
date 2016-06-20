import React, { Component, PropTypes } from 'react'
import Select, {Option, OptGroup} from 'rc-select';
import 'rc-select/assets/index.css';

var Combox = React.createClass({

    getInitialState(){
        let {defaultValue} = this.props;
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

        let value = event.target.text;
        this.setState({
            value,
            select: e
        });


        this.props.onSelect(e,index);
    },

    getSelect(){
        return this.state.select;
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
        if(defaultValue != this.props.defaultValue || change)
        this.setState({
            value: defaultValue instanceof Object ? defaultValue.text : defaultValue,
            select: defaultValue instanceof Object ? defaultValue : {}
        });
    },

    render(){
        return (<div className={"dropdown "+this.props.className} style={this.props.style}>
            <button ref="expand" className="btn btn-default dropdown-toggle" type="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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