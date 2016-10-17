import React from 'react'
import {userStateMap, terminalBusinessType,
    terminalKeyBusinessType, keyTypeStateMap} from './enumerate.js'
export const TOPO_PHYSIC = "physic";
export const TOPO_TREE = "tree";
export const TOPO_STAR = "star";

export const selectView = [
    {
        text: "物理拓扑",
        value: TOPO_PHYSIC
    },
    {
        text: "树型拓扑",
        value: TOPO_TREE
    },
    {
        text: "星型拓扑",
        value: TOPO_STAR
    }
];

export const cloudImg = {
    0: "static/img/cloud_unknown.png",
    1: "static/img/cloud_normal.png",
    2: "static/img/cloud_fail.png",
    3: "static/img/cloud_outline.png"
};

export const OP_CARD_TYPE = 10;
export const CARD_TYPE_NUL = 0;
export const CARD_TYPE_DIGITTRUNK = 6;
export const REFRESH_INTERVAL = 2000;
export function NOP(){}

export const paramConfig = {
  deviceLimitCount: 3
};

export function noDataText(){
    return '暂无数据';
}

export const deviceMenu = [
    {
        key: 'modify',
        text: '修改'
    },
    {
        key: 'port',
        text: '添加端口'
    },
    {
        key: 'keyconfig',
        text: '按键配置'
    },
    {
        key: 'business',
        text: '业务配置'
    },
    {
        key: 'remove',
        text: '删除'
    }
];

export const devicePortMenu = [
    {
        key: 'modify',
        text: '修改'
    },
    {
        key: 'remove',
        text: '删除'
    }
];

export const roleMenu = [
    {
        key: 'modify',
        text: '修改'
    },
    {
        key: 'remove',
        text: '删除'
    }
];

export const userMenu = [
    {
        key: 'modify',
        text: '修改'
    },
    // {
    //     key: 'modifyPassword',
    //     text: '更换密码'
    // },
    {
        key: 'remove',
        text: '删除'
    }
];

export const recordMenu = [
    {
        key: 'play',
        text: '播放'
    },
    {
        key: 'remove',
        text: '删除'
    }
];

export const deviceColumns = [
    {
        key: "name",
        title: "名称",
        dataIndex: "name",
        width: 100
    },
    {
        key: "code",
        title: "终端号码",
        dataIndex: "code",
        width: 120
    },
    {
        key: "netUnitName",
        title: "所属网元",
        dataIndex: "netUnitName",
        width: 150
    }
];

export const devicePortColumns = [
    {
        key: "number",
        title: "端口号码",
        dataIndex: "number",
        width: 80
    },
    {
        key: "enable",
        title: "是否启用",
        dataIndex: "enable",
        render:(value) => value?'启用':'不启用',
        width: 100
    },
    {
        key: "function",
        title: "功能",
        dataIndex: "function",
        width: 140
    }
];

export const userColumns = [
    {
        key: "name",
        title: "用户名",
        dataIndex: "name",
        width: 150
    },
    {
        key: "roleName",
        dataIndex: "roleName",
        title: "角色",
        width: 120
    },
    {
        key: "createTime",
        title: "创建时间",
        dataIndex: "createTime",
        width: 200
    }
];

export const roleColumns = [
    {
        key: "name",
        title: "角色",
        dataIndex: "name",
        width: 150
    }
];

export const menu = [
    {
        label:"系统监视",
        value: "0",
        children:[
            {
                value: "0-0",
                label: "网络监视"
            },
            {
                value: "0-1",
                label: "业务监视"
            },
            {
                value: "0-2",
                label: "设备监视"
            }
        ]
    },
    {
        label: "系统配置",
        value:"1",
        children: [
            {
                value: "1-0",
                label: "网络配置"
            },
            {
                value: '1-1',
                label: '用户数据配置'
            },
            {
                value: "1-2",
                label: "设备配置"
            },
            {
                value: "1-3",
                label: "时钟配置"
            },
            {
                value: '1-4',
                label: '时间配置'
            },
            {
                value: "1-5",
                label: "数字中继"
            },
            {
                value: "1-6",
                label: "会议配置"
            },
            {
                value: '1-7',
                label: '通令配置'
            },
            {
                value: '1-8',
                label: '广播配置'
            },
            {
                value: '1-9',
                label: '话务台配置'
            }
        ]
    },
    {
        value: "2",
        label: "录音软件"
    },
    {
        value: "3",
        label: "系统日志"
    },
    {
        value: "4",
        label: "系统管理",
        children:[
            {
                value: "4-0",
                label: "用户管理"
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

export const businessBriefColumn = [
    {
        key: "name",
        title: "业务名称",
        dataIndex: "name",
        width: 200
    },
    {
        key: "img",
        title: "业务类型",
        dataIndex: "img",
        width: 200,
        render: (value, row, index) => <img src={value}/>
    },
    {
        key: "count",
        dataIndex: "count",
        title: "数量",
        width: 80
    }
];

export function rangeArray(start, end){
    return Array(end - start + 1).fill(0).map((v, i) => i + start);
}

export function dateFormat(timestamp){
    let date = new Date(timestamp);
    return date.getFullYear()+"-"+
        (date.getMonth()+1)+
        "-"+date.getDate()+" "+
        date.getHours()+":"+
        date.getMinutes()+":"+
        date.getSeconds();
}

export function getTimeStr(time){
    if(time<1000)
        return time/1000+'秒';
    else
        time = time/1000;
    let result = '';
    const timeSpan = [
        {
            span: 1,
            text: '秒'
        },
        {
            span: 60,
            text: '分'
        },
        {
            span: 3600,
            text: '小时'
        },
        {
            span: 24*3600,
            text: '天'
        },
        {
            span: 24*3600*365,
            text: '年'
        }
    ];

    timeSpan.forEach(e => {
        if(time>= e.span) {
            result += Math.floor(time/e.span) + e.text;
            time = time % e.span;
        }
    });
    return result;
}

const tongling = [
    {
        key: "netunitName",
        dataIndex: "netunitName",
        width: 120,
        title: "网元"
    },
    {
        key: "number",
        dataIndex: "number",
        title: "号码",
        width: 100
    },
    {
        key: "chairman",
        dataIndex: "chairman",
        title: "主席",
        width: 100
    },
    {
        key: "superior",
        dataIndex: "superior",
        width: 100,
        title: "长官"
    },
    {
        key: "name",
        dataIndex: "name",
        title: "业务名",
        width: 120
    },
    {
        key: "commanders",
        dataIndex: "commanders",
        title: "指挥",
        width: 280,
        render: (value,row, index) => <ul className="table-list">
            {
                value.map(e => <li className="table-list-item">{e.number}<br/>{userStateMap[e.state]}</li>)
            }
        </ul>
    },
    {
        key: "members",
        dataIndex: "members",
        width: 280,
        title: "成员",
        render: (value,row, index) => <ul className="table-list">
            {
                value.map(e => <li className="table-list-item">{e.number}<br/>{userStateMap[e.state]}</li>)
            }
        </ul>
    }
];

const p2p = [
    {
        key: "netunitName",
        dataIndex: "netunitName",
        width: 120,
        title: "网元"
    },
    {
        key: "caller",
        dataIndex: "caller",
        width: 100,
        title:"主叫号码"
    },
    {
        key: "second",
        dataIndex: "second",
        width: 280,
        title: "被叫号码",
        render: (value,row,index) => <span>{value.number+", 状态:"+userStateMap[value.state]}</span>
    }
];

const meeting = [
    {
        key: "netunitName",
        dataIndex: "netunitName",
        title: "网元",
        width: 120
    },
    {
        key: "number",
        dataIndex: "number",
        title: "号码",
        width: 100
    },
    {
        key: "name",
        dataIndex: "name",
        title: "业务名",
        width: 120
    },
    {
        key: "caller",
        dataIndex: "caller",
        title: "主叫号码",
        width: 100
    },
    {
        key: "members",
        width: 260,
        dataIndex: "members",
        title: "成员",
        render: (value,row, index) => <ul className="table-list">
            {
                value.map(e => <li className="table-list-item">{e.number}<br/>{userStateMap[e.state]}</li>)
            }
        </ul>
    }
];

const threetalk = [
    {
        key: "netunitName",
        dataIndex: "netunitName",
        title: "网元",
        width: 120
    },
    {
        key: "caller",
        dataIndex: "caller",
        title: "主叫号码",
        width: 100
    },
    {
        key: "second",
        dataIndex: "second",
        title: "被叫号码1",
        width: 240,
        render: (value,row,index) => <span>{value.number+", 状态:"+userStateMap[value.state]}</span>
    },
    {
        key: "third",
        dataIndex: "third",
        title: "被叫号码2",
        width: 240,
        render: (value,row,index) => <span>{value.number+", 状态:"+userStateMap[value.state]}</span>
    }
];

const broadcast = [
    {
        key: "netunitName",
        dataIndex: "netunitName",
        title: "网元",
        width: 120
    },
    {
        key: "number",
        dataIndex: "number",
        title: "号码",
        width: 200,
        render: (value,row,index) => <span>{value.number+", 状态:"+userStateMap[value.state]}</span>
    },
    {
        key: "device",
        dataIndex: "device",
        title: "设备",
        width: 200,
        render: (value,row,index) => <span>{value.number+", 状态:"+userStateMap[value.state]}</span>
    },
    {
        key: "name",
        dataIndex: "name",
        title: "业务名",
        width: 120
    },
    {
        key: "members",
        dataIndex: "members",
        width: 260,
        title: "成员",
        render: (value,row, index) => <ul className="table-list">
            {
                value.map(e => <li className="table-list-item"><span>{e.number}<br/>{userStateMap[e.state]}</span></li>)
            }
        </ul>
    }
];

const trunk = [
    {
        key: "netunitName",
        dataIndex: "netunitName",
        width: 120,
        title: "网元"
    },
    {
        key: "number",
        dataIndex: "number",
        width: 100,
        title: "本地号码"
    },
    {
        key: "typeText",
        dataIndex: "typeText",
        width: 100,
        title: "类型"
    },
    {
        key: "shoreNumber",
        dataIndex: "shoreNumber",
        width: 100,
        title: "岸上号码"
    },
    {
        key: "shoreState",
        dataIndex: "shoreState",
        width: 100,
        title: "岸上状态"
    }
];

const vdr = [
    {
        key: "netunitName",
        dataIndex: "netunitName",
        title: "网元"
    },
    {
        key: "vdr",
        dataIndex: "vdr",
        title: "号码"
    },
    {
        key: "user",
        dataIndex: "user",
        title: "用户",
        render: (value,row,index) => <span>{value.number+", 状态:"+userStateMap[value.state]}</span>
    }
];

export const businessColumns = {
    0: [],
    2: tongling,
    3: meeting,
    4: threetalk,
    5: trunk,
    6: trunk,
    7: broadcast,
    9: vdr,
    10: p2p
};

export const businessWidthMap = {
    0: 600,
    2: 800,
    3: 800,
    4: 600,
    5: 520,
    6: 520,
    7: 900,
    9: 500,
    10: 500
};

export const recordColumns = [
    {
        key: "callingNumber",
        title: "主叫号码",
        dataIndex: "callingNumber",
        width: 120
    },
    {
        key: "calledNumber",
        title: "被叫号码",
        dataIndex: "calledNumber",
        width: 120
    },
    {
        key: "startTime",
        title: "录音开始时间",
        dataIndex: "startTime",
        width: 150
    },
    {
        key: "period",
        title: "时长",
        dataIndex: "period",
        width: 80
    }
];

export const logColumns = [
    {
        key: "operator",
        title: "操作用户",
        dataIndex: "operator",
        width: 150
    },
    {
        key: "module",
        title: "所属模块",
        dataIndex: "module",
        width: 120
    },
    {
        key: "description",
        title: "操作内容",
        dataIndex: "description",
        width: 300
    },
    {
        key: "createTime",
        title: "时间",
        dataIndex: "createTime"

    }
];

export const configOperationMenu = [
    {
        key: 'modify',
        text: '修改'
    },
    {
        key: 'remove',
        text: '删除'
    }
];

export const digitTrunkColumns = [
    {
        key: 'netunit',
        title: '网元',
        dataIndex: 'netunit',
        width: 120
    },
    {
        key: 'slot1',
        title: '槽位',
        dataIndex: 'slot',
        width: 80
    },
    {
        key: 'port1',
        title: '端口',
        dataIndex: 'port',
        width: 80
    },
    {
        key: 'modeText',
        title: '模式',
        dataIndex: 'modeText',
        width: 70
    },
    {
        key: 'interfaceTypeText',
        title: '接口类型',
        dataIndex: 'interfaceTypeText',
        width: 80
    },
    {
        key: 'distanceModeText',
        title: '距离模式',
        dataIndex: 'distanceModeText',
        width: 70
    },
    {
        key: 'clockModeText',
        title: '时钟模式',
        dataIndex: 'clockModeText',
        width: 100
    },
    {
        key: 'dpc',
        title: 'DPC',
        dataIndex: 'dpc',
        width: 120
    },
    {
        key: 'opc',
        title: 'OPC',
        dataIndex: 'opc',
        width: 120
    },
    {
        key: 'pcmNum',
        title: 'PCM序号',
        dataIndex: 'pcmNum',
        width: 30
    },
    {
        key: 'pcmTs',
        title: 'PCM时隙号',
        dataIndex: 'pcmTs',
        width: 40
    },
    {
        key: 'updateDate',
        title: '修改时间',
        dataIndex: 'updateDate',
        width: 200
    }
];

export const clockConfigColumns = [
    {
        key: 'netunit',
        title: '网元',
        dataIndex: 'netunit',
        width: 120
    },
    {
        key: 'main',
        title: '主时钟',
        children: [
            {
                key: 'slot1',
                title: '槽位',
                dataIndex: 'slot1',
                width: 100
            },
            {
                key: 'type1',
                title: '类型',
                dataIndex: 'type1',
                width: 150
            },
            {
                key: 'port1',
                title: '端口',
                dataIndex: 'port1',
                width: 100
            }
        ]
    },
    {
        key: 'backup1',
        title: '备时钟1',
        children: [
            {
                key: 'slot2',
                title: '槽位',
                dataIndex: 'slot2',
                width: 100
            },
            {
                key: 'type2',
                title: '类型',
                dataIndex: 'type2',
                width: 150
            },
            {
                key: 'port2',
                title: '端口',
                dataIndex: 'port2',
                width: 100
            }
        ]
    },
    {
        key: 'backup2',
        title: '备时钟2',
        children: [
            {
                key: 'slot3',
                title: '槽位',
                dataIndex: 'slot3',
                width: 100
            },
            {
                key: 'type3',
                title: '类型',
                dataIndex: 'type3',
                width: 150
            },
            {
                key: 'port3',
                title: '端口',
                dataIndex: 'port3',
                width: 100
            }
        ]
    },
    {
        key: 'updateDate',
        title: '修改时间',
        dataIndex: 'updateDate',
        width: 200
    }
];

export const meetingConfigColumn = [
    {
        key: 'netunit',
        title: '网元',
        dataIndex: 'netunit',
        width: 120
    },
    {
        key: 'name',
        title: '名称',
        dataIndex: 'name',
        width: 100
    },
    {
        key: 'code',
        title: '编号',
        dataIndex: 'code',
        width: 100
    },
    {
        key: 'users',
        title: '用户',
        dataIndex: 'usersText',
        width: 250
    },
    {
        key: 'members',
        title: '成员',
        dataIndex: 'membersText',
        width: 250
    },
    {
        key: 'updateDate',
        title: '修改时间',
        dataIndex: 'updateDate',
        width: 200
    }
];

export const tonglingConfigColumn = [
    {
        key: 'netunit',
        title: '网元',
        dataIndex: 'netunit',
        width: 120
    },
    {
        key: 'name',
        title: '名称',
        dataIndex: 'name',
        width: 80
    },
    {
        key: 'code',
        title: '编号',
        dataIndex: 'code',
        width: 80
    },
    {
        key: 'users',
        title: '用户',
        dataIndex: 'usersText',
        width: 200
    },
    {
        key: 'members',
        title: '成员',
        dataIndex: 'membersText',
        width: 200
    },
    {
        key: 'updateDate',
        title: '修改时间',
        dataIndex: 'updateDate',
        width: 200
    }
];

export const userDataConfigColumn = [
    {
        key: 'netunit',
        title: '网元',
        dataIndex: 'netunit',
        width: 120
    },
    {
        key: 'slot',
        title: '槽位号',
        dataIndex: 'slot',
        width: 50
    },
    {
        key: 'ts',
        title: '时隙号',
        dataIndex: 'ts',
        width: 50
    },
    {
        key: 'number',
        title: '用户号码',
        dataIndex: 'number',
        width: 80
    },
    {
        key: 'callRightName',
        title: '呼叫权限',
        dataIndex: 'callRightName',
        width: 100
    },
    {
        key: 'termTypeName',
        title: '终端类型',
        dataIndex: 'termTypeName',
        width: 80
    },
    {
        key: 'userTypeName',
        title: '用户类型',
        dataIndex: 'userTypeName',
        width: 100
    },
    {
        key: 'userLevelName',
        title: '用户级别',
        dataIndex: 'userLevelName',
        width: 100
    },
    {
        key: 'recordText',
        title: '录音权限',
        dataIndex: 'recordText',
        width: 80
    },
    {
        key: 'hotlineText',
        title: '热线权限',
        dataIndex: 'hotlineText',
        width: 100
    },
    {
        key: 'busingcfText',
        title: '遇忙转移权限',
        dataIndex: 'busingcfText',
        width: 100
    },
    {
        key: 'followcfText',
        title: '跟随转移权限',
        dataIndex: 'followcfText',
        width: 100
    },
    {
        key: 'nohinderText',
        title: '免打扰权限',
        dataIndex: 'nohinderText',
        width: 80
    },
    {
        key: 'reminderText',
        title: '定时提醒权限',
        dataIndex: 'reminderText',
        width: 100
    },
    {
        key: 'phonestationText',
        title: '话务台权限',
        dataIndex: 'phonestationText',
        width: 80
    },
    {
        key: 'volatileMeetText',
        title: '可变会议权限',
        dataIndex: 'volatileMeetText',
        width: 100
    },
    {
        key: 'digitRelayText',
        title: '数字中继权限',
        dataIndex: 'digitRelayText',
        width: 60
    },
    {
        key: 'simulateRelayText',
        title: '模拟中继权限',
        dataIndex: 'simulateRelayText',
        width: 100
    },
    {
        key: 'updateDate',
        title: '修改时间',
        dataIndex: 'updateDate',
        width: 200
    }
];

export const phoneStationColumn = [
    {
        key: 'netunit',
        title: '网元',
        dataIndex: 'netunit',
        width: 120
    },
    {
        key: 'name',
        title: '名称',
        dataIndex: 'name',
        width: 100
    },
    {
        key: 'code',
        title: '编号',
        dataIndex: 'code',
        width: 100
    },
    {
        key: 'members',
        title: '成员',
        dataIndex: 'membersText',
        width: 250
    },
    {
        key: 'updateDate',
        title: '修改时间',
        dataIndex: 'updateDate',
        width: 200
    }
];

export const terminalBusinessColumn = [
    {
        key: 'name',
        title: '业务名',
        dataIndex: 'name',
        width: 150
    },
    {
        key: 'code',
        title: '业务号',
        dataIndex: 'code',
        width: 100
    },
    {
        key: 'type',
        title: '业务类型',
        dataIndex: 'type',
        render: (value, row ,index) => terminalBusinessType[value],
        width: 100
    },
    {
        key: 'members',
        title: '成员',
        dataIndex: 'membersText',
        width: 250
    }
];

export const terminalKeyColumn = [
    {
        key: 'keyValue',
        title: '按键值',
        dataIndex: 'keyValue',
        width: 80
    },
    {
        key: 'keyType',
        title: '按键类型',
        dataIndex: 'keyType',
        render: (value, row, index) => keyTypeStateMap[value],
        width: 120
    },
    {
        key: 'code',
        title: '业务号',
        dataIndex: 'code',
        width: 100
    },
    {
        key: 'name',
        title: '业务名',
        dataIndex: 'name',
        width: 150
    },
    {
        key: 'businessType',
        title: '业务类型',
        dataIndex: 'businessType',
        render: (value, row, index) => terminalKeyBusinessType[value],
        width: 120
    }
];

export const broadcastColumn = [
    {
        key: 'netunit',
        title: '网元',
        dataIndex: 'netunit',
        width: 120
    },
    {
        key: 'name',
        title: '名称',
        dataIndex: 'name',
        width: 100
    },
    {
        key: 'code',
        title: '编号',
        dataIndex: 'code',
        width: 100
    },
    {
        key: 'users',
        title: '用户',
        dataIndex: 'usersText',
        width: 250
    },
    {
        key: 'broadcaster',
        title: '广播机号码',
        dataIndex: 'broadcaster',
        width: 100
    },
    {
        key: 'members',
        title: '成员',
        dataIndex: 'membersText',
        width: 250
    },
    {
        key: 'updateDate',
        title: '修改时间',
        dataIndex: 'updateDate',
        width: 200
    }
];

export const userDataDisplayKey = ['netunitName', 'callRightName',
    'termTypeName', 'userTypeName', 'recordText', 'hotlineText',
    'busingcfText', 'followcfText', 'phonestationText', 'nohinderText',
    'reminderText', 'volatileMeetText', 'digitRelayText', 'simulateRelayText'];

export function rightValue2Text(right, enable, text=''){
    let displayText = right? '开通': '禁用';
    if(enable != undefined && right){
        displayText += ', 开关';
        displayText += enable? '打开': '关闭';
        if(text!='')
            displayText += ', ' + text;
    }
    return displayText;
}

export function clearKey(data, keys=[]){
    keys.forEach(k => data[k]=undefined);
}

export const rightSwitchModel = [
    {
        text: '禁用',
        value: 0
    },
    {
        text: '开通',
        value: 1
    }
];

export const tsInfo = {
    2: 32,
    3: 4,
    12: 6
};