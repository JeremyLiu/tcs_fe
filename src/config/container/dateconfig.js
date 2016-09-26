import React from 'react'
import {connect} from 'react-redux'
import Combox from '../../common/component/combox.js'

var dateConfig = React.createClass({

    handleClick(){

    },

    render(){
        return <div>
            <form className="form-inline">
                <div class="form-group">
                    <label className="label-4">网元</label>
                    <Combox ref="dest" className="left-float" style={{width:120}}
                            defaultValue="选择网元" model={this.props.netunit}/>
                </div>
                <div class="form-group">
                    <label className="label-4">板卡号</label>
                    <Combox ref="dest" className="left-float" style={{width:120}}
                            defaultValue="选择板卡" model={this.props.card}/>
                </div>
                <div className="form-group">
                    <label className="label-6">时间</label>
                    <input ref="time" type="text" readonly="readonly" maxlength="20"
                           className="form-control form-date compact-inline"
                           defautValue="" />
                    <input type="checkbox">使用系统当前时间</input>
                </div>
                <button className="btn btn-default" onClick={this.handleClick}>写入配置</button>
            </form>
        </div>
    }
});

function stateMap(state) {

}

export default connect(stateMap)(dateConfig);