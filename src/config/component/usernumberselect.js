import React from 'react';
import {connect} from 'react-redux'
import Select, {Option} from 'rc-select';
import {get_number_entry} from '../../action/config.js'
import 'rc-select/assets/index.css';

var UserNumberSelect = React.createClass({

    getDefaultProps(){
      return {
          value: [],
          placehoder: '',
          model: [],
          multiple: true,
          filter: e=>true
      }
    },

    getInitialState(){
      return {
          value: this.props.value
      }
    },

    componentWillReceiveProps(nextProps){
        let change = false;
        if (this.props.multiple) {
            if (nextProps.value.length == this.state.value.length) {
                let s = new Set();
                this.state.value.forEach(e => s.add(e));
                for (var i = 0; i < nextProps.value.length; i++)
                    if (!s.has(nextProps.value[i])) {
                        change = true;
                        break;
                    }
            } else
                change = true;
        }else
            change = nextProps.value != this.state.value;
        this.setState({
            value: nextProps.value
        });
    },

    handleChange(v){
        this.setState({
            value: v
        })
    },

    getSelect(){
      return this.state.value
    },

    render(){
        let {value} = this.state;
        let {style, placehoder, model, filter, multiple} = this.props;
        let data = model.filter(filter);
        return <Select
            value={value}
            animation="slide-up"
            choiceTransitionName="rc-select-selection__choice-zoom"
            dropdownStyle={{maxHeight: 350, overflow: 'auto', zIndex: 1060, position:'absolute'}}
            style={style}
            multiple={multiple}
            combobox={!multiple}
            notFoundContent={'请先配置用户数据'}
            optionFilterProp="children"
            optionLabelProp="children"
            placeholder={placehoder}
            onChange={this.props.onChange}>
            {data.map(e => <Option value={e.value}>{e.text}</Option>)}
        </Select>
    }
});

function stateMap(s){
    let model = s.constant.numberEntry;
    if(!model)
        model = [];
    model = model.map(e => {
        return {
            text: e.number,
            value: e.number,
            userLevel: e.userLevel
        };
    });
    return {
        model: model
    }
}

export default connect(stateMap)(UserNumberSelect);

