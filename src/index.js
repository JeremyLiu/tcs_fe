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
import {fetch_net_state, fetch_device_state,
    fetch_card_state, set_timer,
    fetch_business, fetch_business_data,
    refresh_recording_data} from './action/network.js'
import {get_all_role} from './action/user.js'
import {REFRESH_INTERVAL} from './constant/model.js'
import ConfirmDialog from './common/container/confirmdialog.js'
import {menu} from './constant/model.js'

const loggerMiddleware = createLogger();
const store = createStore(rootReducer,  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
));

const func = [
    {
        path: [0,0],
        content: <NetworkMonitor/>,
        listener: (active) => {
            if(active){
                let state = store.getState();
                if(state.ui.card.visible){
                    let netunit = state.ui.card.netunit.id;
                    store.dispatch(fetch_card_state(netunit));
                    store.dispatch(set_timer(setInterval(function () {
                        store.dispatch(fetch_card_state(netunit));
                    }, REFRESH_INTERVAL)));
                }else {
                    store.dispatch(fetch_net_state());
                    store.dispatch(set_timer(setInterval(function () {
                        store.dispatch(fetch_net_state());
                    }, REFRESH_INTERVAL)));
                }
            }
        }
    },
    {
        path: [0,1],
        content: <BusinessMonitor/>,
        listener: (active) => {
            if(active){
                let state = store.getState();
                if(state.business.visible){
                    store.dispatch(fetch_business_data(state.business.curDetail));
                    store.dispatch(set_timer(setInterval(function () {
                        store.dispatch(fetch_business_data(state.business.curDetail));
                    }, REFRESH_INTERVAL)));
                }else{
                    store.dispatch(fetch_business());
                    store.dispatch(set_timer(setInterval(function () {
                        store.dispatch(fetch_business());
                    }, REFRESH_INTERVAL)));
                }
            }
        }
    },
    {
        path: [0,2],
        content: <DeviceMonitor/>,
        listener: (active) => {
            if(active){
                store.dispatch(fetch_device_state());
                let deviceTimer  = setInterval(function () {
                    store.dispatch(fetch_device_state());
                }, REFRESH_INTERVAL);
                store.dispatch(set_timer(deviceTimer));
            }
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
        content: <Record/>,
        listener: (active) => {
            if(active) {
                store.dispatch(refresh_recording_data());
                store.dispatch(set_timer(setInterval(function () {
                    store.dispatch(refresh_recording_data());
                }, REFRESH_INTERVAL)));
            }
        }
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