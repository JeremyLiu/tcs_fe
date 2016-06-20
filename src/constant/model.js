
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

export const OP_CARD_TYPE = 10;
export const REFRESH_INTERVAL = 5000;

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
    {
        key: 'modifyPassword',
        text: '更换密码'
    },
    {
        key: 'remove',
        text: '删除'
    }
]

export const deviceColumns = [
    {
        key: "name",
        title: "名称",
        dataIndex: "name",
        width: 100
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
        key: "id",
        title: "编号",
        dataIndex: "id",
        width: 80
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
                value: "0-1",
                label: "网络监视"
            },
            {
                value: "0-2",
                label: "业务监视"
            },
            {
                value: "0-3",
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
                value: "1-1",
                label: "设备配置"
            },
            {
                value: "1-2",
                label: "数字中继"
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


export function rangeArray(start, end){
    return Array(end - start + 1).fill(0).map((v, i) => i + start);
}
