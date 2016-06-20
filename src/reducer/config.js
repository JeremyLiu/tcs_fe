import * as Action from '../action/config.js'
import { combineReducers } from 'redux'

const initElementDialog = {
    isOpen : false,
    action: 'create',
    id:0,
    name:'',
    ip:''
};

const initConfig ={
    device:[
        // {
        //     id:1,
        //     name: "test1",
        //     devices: [
        //         {
        //             id:3,
        //             name: "device1"
        //         },
        //         {
        //             id:2,
        //             name: "device2"
        //         }
        //     ]
        // },
        // {
        //     id:2,
        //     name: "test1",
        //     devices: [
        //         {
        //             id:3,
        //             name: "device1"
        //         },
        //         {
        //             id:2,
        //             name: "device2"
        //         },
        //         {
        //             id:2,
        //             name: "device2"
        //         }
        //     ]
        // },
        // {
        //     id:3,
        //     name: "test3",
        //     devices: [
        //         {
        //             id:3,
        //             name: "device1"
        //         },
        //         {
        //             id:2,
        //             name: "device2"
        //         },
        //         {
        //             id:2,
        //             name: "device2"
        //         }
        //     ]
        // }
    ],
    connect: [
        // {
        //     srcId: 1,
        //     destId: 2
        // },
        // {
        //     srcId: 2,
        //     destId: 1
        // },
        // {
        //     srcId: 2,
        //     destId: 3
        // },
        // {
        //     srcId: 1,
        //     destId: 3
        // },
        // {
        //     srcId: 3,
        //     destId:1
        // }
    ]
};

const initPort={device: -1, ports: []};

const initCardList = [];

export function netUnitConfig(state = initConfig, action){
    switch(action.type){
        case Action.SET_CONFIG:
            return action.data;
        case Action.ADD_ELEMENT:
            let newState = Object.assign({},state);
            newState.device.push({
                id: action.id,
                name: action.name,
                ip:action.ip,
                devices:[]
            });
            return newState;
        case Action.REMOVE_ELEMENT:
            return {
                device: state.device.filter(e => e.id != action.id),
                connect: state.connect.filter(e => e.srcId != action.id && e.destId != action.id)
            };
        case Action.SET_ELEMENT_DEVICES:
            newState = Object.assign({},state);
            for(var i=0;i < state.device.length;i++){
                if(action.netunit == state.device[i].id){
                    newState.device[i].devices = action.data;
                    break;
                }
            }
            return newState;
        case Action.ADD_CONNECT:
            newState = Object.assign({},state);
            newState.connect.push(action.data);
            return newState;
        default:
            return state;
    }
}

export function cardConfig(state = [], action){
    switch(action.type){
        case Action.SET_CARD_CONFIG:
            return action.data;
        default:
            return state;
    }
}

export function deviceConfig(state = [], action){
    switch(action.type){
        case Action.SET_DEVICE:
            return action.data;
        case Action.ADD_DEVICE_SUCCESS:
            return [
                ...state,
                {
                    id:action.id,
                    netUnitId: action.netunit,
                    name: action.name,
                    netUnitName:action.netUnitName
                }
            ];
        case Action.MODIFY_DEVICE_SUCCESS:
            let newState = state.concat();
            newState.forEach(e => {
               if(e.id == action.id){
                   e.name = action.name;
                   e.netUnitId = action.netunit;
                   e.netUnitName = action.netUnitName;
               }
            });
            return newState;
        case Action.REMOVE_DEVICE:
            return state.filter(e => e.id != action.id);
        default:
            return state;
    }
}

export function devicePort(state = initPort, action){
    switch(action.type){
        case Action.SET_DEVICE_PORT:
            return {
                device: action.device,
                ports: action.data
            };
        case Action.ADD_DEVICE_PORT_SUCCESS:
            if(state.device == action.deviceId)
                return {
                    device: state.device,
                    ports: [
                        ...state.ports,
                        action.data
                    ]
                };
            else
                return state;
        case Action.MODIFY_DEVICE_PORT_SUCCESS:
            if(state.device == action.deviceId)
                return {
                    device: state.device,
                    ports: state.ports.map(e => {
                        if(e.id == action.id)
                            return {
                                id: action.number,
                                function: action.name
                            };
                        else
                            return e;
                    })
                };
            else
                return state;
        case Action.REMOVE_DEVICE_PORT_SUCCESS:
            return {
                device: state.device,
                ports: state.ports.filter(e => e.id != action.id)
            };
        case Action.CLEAR_PORT_LIST:
            return initPort;
        default:
            return state;
    }
}