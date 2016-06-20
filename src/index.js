import 'rc-tabs/assets/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducer/index.js'
import { Provider } from 'react-redux'
import Tabs, { TabPane } from 'rc-tabs'
import SysTime from './common/component/time.js'
import MenuTab from './common/component/menutab.js'
import NetworkMonitor from './sysmonitor/container/networkmonitor.js'
import BusinessMonitor from './sysmonitor/container/businessmonitor.js'
import DeviceMonitor from './sysmonitor/container/devicemonitor.js'
import Record from './record/index.js'
import DigitalTrunk from './config/container/digitaltrunk.js'
import SysLog from './syslog/index.js'
import NetworkConfig from './config/container/network.js'
import DeviceList from './config/container/device.js'
import UserManage from './sysmanage/user.js'
import RoleManage from './sysmanage/role.js'
import {get_all_card_type} from './action/config.js'
import {fetch_net_state, fetch_device_state} from './action/network.js'
import {get_all_role} from './action/user.js'
import {REFRESH_INTERVAL} from './constant/model.js'
import ConfirmDialog from './common/container/confirmdialog.js'
import {menu} from './constant/model.js'

const loggerMiddleware = createLogger();
const store = createStore(rootReducer,  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
));

var topoTimer;
var deviceTimer;

let mainMenu = [
    {
        label:"系统监视",
        value: "0",
        children:[
            {
                value: "0-0",
                label: "网络监视",
                content: <NetworkMonitor/>,
                listener: (active) => {
                    if(active){
                        topoTimer = setInterval(function(){
                            store.dispatch(fetch_net_state());
                        },REFRESH_INTERVAL);
                    }else if(topoTimer){
                        clearInterval(topoTimer);
                    }
                }
            },
            {
                value: "0-1",
                label: "业务监视",
                content: <BusinessMonitor/>
            },
            {
                value: "0-2",
                label: "设备监视",
                content: <DeviceMonitor/>,
                listener: (active) => {
                    if(active){
                        deviceTimer  = setInterval(function () {
                            store.dispatch(fetch_device_state());
                        }, REFRESH_INTERVAL);
                    }else if(deviceTimer)
                        clearInterval(deviceTimer);
                }
            }
        ]
    },
    {
        label: "系统配置",
        value:"1",
        children: [
            {
                value: "1-0",
                label: "网络配置",
                content: <NetworkConfig/>
            },
            {
                value: "1-1",
                label: "设备配置",
                content: <DeviceList/>
            },
            {
                value: "1-2",
                label: "数字中继",
                content: <DigitalTrunk/>
            }
        ]
    },
    {
        value: "2",
        label: "录音软件",
        content: <Record/>
    },
    {
        value: "3",
        label: "系统日志",
        content: <SysLog/>
    },
    {
        value: "4",
        label: "系统管理",
        children:[
            {
                value: "4-0",
                label: "用户管理",
                content: <UserManage/>
            },
            {
                value: "4-1",
                label: "角色管理"
            },
            {
                value: "4-2",
                label: "修改密码"
            }
        ]
    }

];

const func = [
    {
        path: [0,0],
        content: <NetworkMonitor/>,
        listener: (active) => {
            if(active){
                topoTimer = setInterval(function(){
                    store.dispatch(fetch_net_state());
                },REFRESH_INTERVAL);
            }else if(topoTimer){
                clearInterval(topoTimer);
            }
        }
    },
    {
        path: [0,1],
        content: <BusinessMonitor/>
    },
    {
        path: [0,2],
        content: <DeviceMonitor/>,
        listener: (active) => {
            if(active){
                deviceTimer  = setInterval(function () {
                    store.dispatch(fetch_device_state());
                }, REFRESH_INTERVAL);
            }else if(deviceTimer)
                clearInterval(deviceTimer);
        }
    },
    {
        path: [1,0],
        content: <NetworkConfig/>
    },
    {
        path: [1,1],
        content: <DeviceList/>
    },
    {
        path: [1,2],
        content: <DigitalTrunk/>
    },
    {
        path: [4,0],
        content: <UserManage/>
    },
    {
        path: [2],
        content: <Record/>
    },
    {
        path: [3],
        content: <SysLog/>
    },
    {
        path: [4,0],
        content: <UserManage/>
    },
    {
        path: [4,1],
        content: <RoleManage/>
    }
];

func.forEach(
    e => {
        let cur = menu;
        e.path.forEach(p => cur = cur[p].children ? cur[p].children : cur[p])
        if(e.content)
            cur.content = e.content;
        if(e.listener)
            cur.listener = e.listener;
    }
);

var App = React.createClass({

    getDefaultProps(){
        return {
            menu: []
        }
    },

    handleMenuClick(newIndex){
        this.activeTree.menu[this.activeTree.active] = newIndex;
        this.onChange();
    },

    handleTabChange(key){
        this.activeTree.active = Number(key);
        this.onChange();
    },

    onChange(){
        let {menu} = this.props;
        for(var i=0; i< menu.length; i++) {
            let tabActive = i == this.activeTree.active;
            if (menu[i].listener)
                menu[i].listener(tabActive);
            if (menu[i].children){
                for(var j=0; j<menu[i].children.length; j++){
                    if(menu[i].children[j].listener)
                        menu[i].children[j].listener(tabActive && j==this.activeTree.menu[this.activeTree.active]);
                }
            }
        }
    },

    componentDidMount(){
        this.onChange();
    },

    render(){

        let init = this.props.menu.map(e => 0);
        this.activeTree =  {
            menu: init,
            active: 0
        };
        return (<div>
            <SysTime/>
            <Tabs defaultActiveKey="0" className="navbar" onChange={this.handleTabChange}>
                {
                    this.props.menu.map((menuItem, index) => {
                        let content;
                        if (menuItem.content)
                            content = menuItem.content;
                        else {
                            let subMenu = menuItem.children;
                            if (subMenu instanceof Array) {
                                let menuItems = subMenu.map((m, i) => {
                                    return {
                                        text: m.label,
                                        key: i + ''
                                    }
                                });
                                content = <MenuTab tabs={menuItems} mode="vertical" onClick={this.handleMenuClick}>
                                    {subMenu.map(m => m.content)}
                                </MenuTab>;
                            }
                        }
                        return <TabPane tab={menuItem.label} key={index+''}>
                            {content}
                        </TabPane>;
                    })
                }
            </Tabs>
            <ConfirmDialog/>
        </div>);
    }
});
store.dispatch(get_all_card_type());
store.dispatch(get_all_role());

ReactDOM.render(
    <Provider store={store}>
        <App menu={menu}/>
    </Provider>,
    document.getElementById('container'));