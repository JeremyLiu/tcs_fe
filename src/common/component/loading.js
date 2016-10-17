import React from 'react'
import {connect} from 'react-redux'

var Loading = React.createClass({

    render(){
        let {visible, text} = this.props;
        return <div style={{
            display: visible?'block':'none'
        }} className="loading">{text}</div>
    }
});

function stateMap(state){
    return state.ui.loading;
}

export default connect(stateMap)(Loading);