function map2array(m){
    let a = [];
    for(var key in m){
        a.push({
            value: key,
            text: m[key]
        })
    }
    return a;
}

export const relayModeMap = {
    1: '直通',
    2: 'SS1',
    3: 'SS7'
};

export const relayModeArray = map2array(relayModeMap);

export const relayInterfaceTypeMap = {
    0: '75欧姆',
    1: '120欧姆'
};

export const relayInterfaceArray = map2array(relayInterfaceTypeMap);

export const relayDistanceModeMap = {
    0: '短距离',
    1: '长距离'
};

export const relayDistanceModeArray = map2array(relayDistanceModeMap);

export const relayClockModeMap = {
    0: '主（时钟来自E1接口）',
    1: '从（时钟来自主控板 ） '
};

export const relayClockModeArray = map2array(relayClockModeMap);

export const callRightMap = {
    0: '呼叫被禁止',
    1: '只限本网元呼叫',
    2: '只限本局呼叫',
    3: '只限网内呼叫',
    4: '具有长话呼叫功能',
    5: '国际呼叫',
    6: '特殊呼叫'
};

export const callRightArray = map2array(callRightMap);

export const termTypeMap = {
    0: '脉冲',
    1: '音频',
    2: '数据'
};

export const termTypaArray = map2array(termTypeMap);

export const userTypeMap = {
    0: '接入网用户',
    1: '交换机用户'
};

export const userTypeArray = map2array(userTypeMap);

export const userLevelMap = {
    1: '首长',
    2: '舰长',
    3: '机电长',
    4: '导弹长',
    5: '报房',
    6: 'ECU',
    7: '动力长',
    8: '多向战位',
    9: '战位',
    10: '1型战位',
    12: '话务台',
    13: '电话机',
    14: '广播机',
    15: '数字视听设备',
    16: 'VDR设备',
    17: '模拟中继',
    18: '数字中继',
    19: '虚拟端口'
};

export const userLevelArray = map2array(userLevelMap);

export const userStateMap = {
    0: '空闲',
    1: '呼出',
    2: '振铃',
    3: '收号',
    4: '振铃',
    5: '通话',
    6: '拆线',
    7: '释放',
    8: '虚连接',
    9: '异常',
    10: '被强拆'
};

export const userStateArray = map2array(userLevelMap);

export const keyTypeStateMap = {
    0: '未定义',
    1: '功能、广播',
    2: '内通战位',
    3: '外通',
    4: '会议',
    5: '通令、广播',
    6: '号码盘'
};

export const keyTypeStateArray = map2array(keyTypeStateMap);

export const terminalBusinessType = {
    1: '通令',
    2: '广播',
    3: '会议'
};

export const terminalBusinessTypeArray = map2array(terminalBusinessType);

export const terminalKeyBusinessType = {
    1: '空闲',
    4: '外通',
    5: '通令指挥',
    6: '通令战位',
    7: '会议',
    8: '勤务点到点',
    9: '模拟中继',
    10: '数字中继'
};

export const terminalKeyBusinessTypeArray = map2array(terminalKeyBusinessType);