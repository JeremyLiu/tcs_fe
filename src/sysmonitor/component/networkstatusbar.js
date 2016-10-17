import React from 'react'

export const STATUS_UNKNOWN = 0;
export const STATUS_NORMAL = 1;
export const STATUS_ERROR = 2;
export const STATUS_NETWORK_ERROR = 3;

export const statusColor = {
    [STATUS_UNKNOWN]: {
        color: "lightgrey",
        rgbColor: "201,201,201",
        label: "未知"
    },
    [STATUS_NORMAL]: {
        color: "greenyellow",
        rgbColor: "158,255,0",
        label: "正常"
    },
    [STATUS_ERROR]: {
        color: "red",
        rgbColor: "255,0,0",
        label: "故障"
    },
    [STATUS_NETWORK_ERROR]: {
        color: "rgb(249,168,26)",
        rgbColor: "249,168,26",
        label: "网络故障"
    }
};

var NetworkStatusBar = React.createClass({
    render(){
        var bar = [];

        for(var key in statusColor)
            bar.push(<div className="right-float">
                <div className="rectangle" style={{
                    backgroundColor: statusColor[key].color
                }}></div>
                <span>{statusColor[key].label}</span>
            </div>)

        return <div className={this.props.className} style={{margin:10,height:32}}>
                {bar}
            </div>;
    }
});

export default NetworkStatusBar;