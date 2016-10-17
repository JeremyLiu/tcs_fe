import * as Config from '../action/config.js'
import * as Network from '../action/network.js'
import * as User from '../action/user.js'
import {SET_ERROR_TEXT} from '../action/response.js'
import { combineReducers } from 'redux'

const initElement = {
    visible: false,
    id: 0,
    ip: '',
    name: '',
    cardCount: 14,
    action: 'create'
};

const initCard = {
    active: 0,
    card: [],
    state: [],
    netunit:{}
};

const initConnect = {
    visible: false,
    srcSelect: -1,
    destSelect: -1,
    port: -1,
    slot: -1,
    card: []
};

const initConfirm ={
    visible: false,
    title: '',
    content: '',
    onConfirm: () => {}
};

const initDevice = {
    visible: false,
    id: 0,
    name: '',
    netunit: -1,
    code: '',
    action: 'create'
};

const initDevicePort = {
    visible: false,
    id: 0,
    name: '',
    number:'',
    deviceId: 0,
    enable: true,
    action: 'create'
};

const initUserDialog = {
    visible: false,
    name: '',
    role: -1,
    id: -1
};

const initRoleDialog = {
    add: false,
    modify: false,
    name: "",
    id: 0
};

const initLoading = {
    visible: false,
    text: ''
};

//新增/修改网元
function element(state=initElement, action){
    switch(action.type){
        case Config.OPEN_ADD_DIALOG:
            return Object.assign({},state,{
                visible: true,
                ip: action.ip,
                name: action.name,
                id: action.id,
                cardCount: action.cardCount,
                action: action.action
            });
        case Config.CLOSE_ADD_DIALOG:
            return Object.assign({},state,{
                visible: false
            });
        default:
            return state;
    }
}

//修改板卡配置
function cardConfig(state=initCard, action){
    switch(action.type){
        case Config.OPEN_CARD_CONFIG_DIALOG:
            return Object.assign({},state,{
                visible: true,
                card: action.card,
                netunit: action.netunit,
                select: 0
            });
        case Config.SELECT_CARD_CONFIG:
            return Object.assign({},state,{
                select: action.select
            });
        case Config.MODIFY_CARD_TYPE:
            let newState = Object.assign({},state);

            newState.forEach((c) => {
               if(c.id == action.id){
                   c.type = action.code;
                   c.name = action.name;
               }
            });

            return newState;
        case Config.CLOSE_CARD_CONFIG_DIALOG:
            return Object.assign({},state,{
                visible: false
            });
        default:
            return state;
    }
}

function connect(state=initConnect, action){
    switch(action.type){
        case Config.OPEN_CONNECT_DIALOG:
            return Object.assign({},state,{
                visible: true
            });
        case Config.CLOSE_CONNECT_DIALOG:
            return initConnect;
        case Config.SELECT_CONNECT_SRC:
            return Object.assign({},state,{
                srcSelect: action.srcId
            });
        case Config.SELECT_CONNECT_DEST:
            return Object.assign({},state,{
                destSelect: action.destId,
                card: action.card
            });
        case Config.SELECT_CONNECT_SLOT:
            return Object.assign({}, state,{
               slot: action.slot
            });
        case Config.SELECT_CONNECT_PORT:
            return Object.assign({}, state,{
                slot: action.port
            });
        default:
            return state
    }
}

//获取板卡状态
function card(state=initCard, action){
    switch(action.type){
        case Network.OPEN_CARD_DIALOG:
            return Object.assign({},state,{
                active: 1,
                card: action.card,
                netunit: action.netunit,
                select: 0
            });
        case Network.SET_CARD_STATE:
            let newState = Object.assign({}, state);
            newState.netunit.state = action.netunit;
            let cardState = action.card;
            newState.card.forEach(c => {
                let cs = cardState.filter(s => s.id == c.id)[0];
                c.state = cs.state;
            });
            newState.state = cardState;
            return newState;
        case Network.CLOSE_CARD_DIALOG:
            return initCard;
        case Config.SET_DEVICE:
            if(action.netunit>0)
                return Object.assign({}, state, {
                    active: 2,
                    netunit: action.netunit
                });
        default:
            return state
    }
}

function confirmDialog(state = initConfirm, action){
    switch(action.type){
        case Config.OPEN_CONFIRM_DIALOG:
            return {
                title: action.title,
                content: action.content,
                onConfirm: action.callback,
                visible: true
            };
        case Config.CLOSE_CONFIRM_DIALOG:
            return initConfirm;
        default:
            return state;
    }
}

function deviceDialog(state = initDevice, action){
    switch(action.type){
        case Config.OPEN_DEVICE_DIALOG:
            if(action.action == 'create')
                return Object.assign({},initDevice,{
                    visible: true
                });
            else
                return Object.assign({}, state,{
                    action: action.action,
                    id: action.data.id,
                    name: action.data.name,
                    netunit: action.data.netUnitId,
                    code: action.data.code,
                    visible: true
                });
        case Config.CLOSE_DEVICE_DIALOG:
            return initDevice;
        default:
            return state;
    }
}

function devicePortDialog(state = initDevicePort, action){
    switch(action.type){
        case Config.OPEN_DEVICE_PORT_DIALOG:
            if(action.action == 'create')
                return Object.assign({}, initDevicePort,{
                    visible: true,
                    deviceId: action.deviceId
                });
            else
                return Object.assign({},state,{
                    action: action.action,
                    id: action.data.id,
                    number: action.data.number,
                    enable: action.data.enable,
                    deviceId: action.deviceId,
                    name: action.data.function,
                    visible: true
                });
        case Config.CLOSE_DEVICE_PORT_DIALOG:
            return initDevicePort;
        default:
            return state;
    }
}

function addUserDialog(state = initUserDialog ,action){
    switch(action.type){
        case User.OPEN_ADD_USER_DIALOG:
            if(action.action=='create')
                return Object.assign({},initUserDialog,{visible: true});
            else
                return Object.assign({}, state, {
                    name: action.data.name,
                    role: action.data.roleId,
                    visible: true,
                    id: action.data.id
                });
        case User.CLOSE_ADD_USER_DIALOG:
            return {
                visible: false
            };
        default:
            return state;
    }
}

function roleDialog(state = initRoleDialog, action){
    switch(action.type){
        case User.OPEN_ROLE_DIALOG:
            return Object.assign({},state,{
               add: true
            });
        case User.CLOSE_ROLE_DIALOG:
            return Object.assign({}, state, {
                add: false
            });
        case User.OPEN_RENAME_DIALOG:
            return Object.assign({}, state, {
                modify: true,
                name: action.name,
                id: action.id
            });
        case User.CLOSE_RENAME_DIALOG:
            return Object.assign({}, state, {
                modify: false
            });
        default:
            return state;
    }
}

export function error(state = {errorText: ''}, action){
    switch (action.type){
        case SET_ERROR_TEXT:
            return Object.assign({}, state, {
                errorText: action.text
            });
        default:
            return state;
    }
}

export function loading(state = initLoading, action){
    switch(action.type){
        case Config.SET_LOADING:
            return {
                text: action.text,
                visible: action.visible
            };
        default:
            return state;
    }
}

export function configDialog(state = {}, action){
    let newState = {};
    switch(action.type){
        case Config.SET_CONFIG_DIALOG_VISIBLE:
            newState[action.configType] = action.visible;
            return Object.assign({}, state, newState);
        default:
            return state;
    }
}

export default combineReducers({
    card,
    cardConfig,
    element,
    connect,
    confirmDialog,
    deviceDialog,
    devicePortDialog,
    configDialog,
    addUserDialog,
    roleDialog,
    error,
    loading
});