import Notification from 'rc-notification'
import 'rc-notification/assets/index.css'
import React from 'react'

const notification = Notification.newInstance({style:{top: 30, left: '50%'}});

export default function notify(msg,duration=2){
    if(msg!='')
        notification.notice({
            content: <span style={{color: 'white'}}>{msg}</span>,
            duration: duration,
            closable: true,
            style:{right: '50%','backgroundColor': 'rgb(230,90,80)'}
        })
};