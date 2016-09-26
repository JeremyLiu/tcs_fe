import Notification from 'rc-notification'
import 'rc-notification/assets/index.css'
import React from 'react'

const notification = Notification.newInstance({'top':10, 'backgroundColor': '#eb7350'});

export default function notify(msg,duration=2){
    notification.notice({
        content: <span>{msg}</span>,
        duration: duration,
        closable: true
    })
};