import React from 'react'
import moment from 'moment'

var TimeShotcut = React.createClass({

    handleClick(s){
        let date = moment().startOf(s).format("YYYY-MM-DD");
        this.props.onChange(date);
    },

    getDefaultProps(){
        return {
            className: '',
            style: {},
            onChange: ()=>{}
        }
    },

    render(){
        let {className, style} = this.props;
        return <div className={"form-group "+className} style={style}>
                <a onClick={e=>this.handleClick('year')}>年</a>
                <a onClick={e=>this.handleClick('month')}>月</a>
                <a onClick={e=>this.handleClick('day')}>日</a>
            </div>
    }
});

export default TimeShotcut;