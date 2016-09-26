import { combineReducers } from 'redux'
import ui from './ui.js'
import user from './user.js'
import constant from './constant.js'
import {netUnitConfig,deviceConfig, devicePort, outlineConfigs} from './config.js'
import {topoState, deviceState, business, timer, record} from './network.js'
import {log} from './log.js'

export default combineReducers({
    ui,
    constant,
    netUnitConfig,
    topoState,
    deviceConfig,
    devicePort,
    deviceState,
    outlineConfigs,
    business,
    timer,
    record,
    log,
    user
});
