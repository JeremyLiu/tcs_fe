import { combineReducers } from 'redux'
import ui from './ui.js'
import user from './user.js'
import constant from './constant.js'
import {netUnitConfig,deviceConfig, devicePort} from './config.js'
import {topoState, deviceState} from './network.js'

export default combineReducers({
    ui,
    constant,
    netUnitConfig,
    topoState,
    deviceConfig,
    devicePort,
    deviceState,
    user
});
