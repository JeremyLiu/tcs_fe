import React from 'react'

function getCurTime(){
    var date = new Date();
    return {
            date:date.getFullYear() + "年" +
                    date.getMonth() + "月" +
                    date.getDate() + "日",
            time:date.getHours() + "点" +
                    date.getMinutes() + "分" +
                    date.getSeconds() + "秒"
    };
}


var sysTime = React.createClass({

    getInitialState:function(){
        return getCurTime();
    },

    componentDidMount: function(){
        this.timer = setInterval(function(){
                this.setState(getCurTime());
        }.bind(this)
        ,1000);
    },

    render: function(){
        return(
          <div className="sys_time">
              <p className="compact">{this.state.date}</p>
              <p className="compact">{this.state.time}</p>
          </div>
        );
    }
});

export default sysTime;