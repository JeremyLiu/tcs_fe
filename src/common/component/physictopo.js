import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {NOP, cloudImg} from '../../constant/model.js'

function getInitDegree(n){

    if(n <= 0)
        return 0;
    if(n%2 != 0)
        return -1/2;
    else
        return 1/2 + 1/n;
}

function getDirection(d){
    d = (d+2) % 2;
    if(d>5/4 && d<7/4)
        return 'top';
    else if(d>1/4 &&d <3/4)
        return 'bottom';
    else if(d>=3/4 && d<=5/4)
        return 'left';
    else
        return 'right';
}

function getTextPosition(d){
    d = (d+2) % 2;
    if(d==0)
        return 'Middle_Right';
    else if(d<1/2)
        return 'Bottom_Right';
    else if(d==1/2)
        return 'Bottom_Center';
    else if(d>1/2 && d<1)
        return 'Bottom_Left';
    else if(d==1)
        return 'Middle_Left';
    else if(d>1 && d <3/2)
        return 'Top_Left';
    else if(d == 3/2)
        return 'Top_Center';
    else
        return 'Top_Right';
}

function surfaceSite(srcNode, destNode, offset){
    let width = srcNode.width;
    let height = srcNode.height;
    let x1= srcNode.x+width/2;
    let y1= srcNode.y+height/2;
    let x2= destNode.x+destNode.width/2;
    let y2= destNode.y+destNode.height/2;
    let x,y;
    if(x1==x2){
        if(y2>y1){
            y= y1- height/2;
        }else{
            y=y1+height/2;
        }
        x=x1+offset;
    }

    const p = height/width;
    const k = (y2-y1)/(x2-x1);

    if(Math.abs(k)>p){
        if(y2>y1){
            y = y1+height/2;
            x = height/(2*k)+x1;
        }else{
            y = y1-height/2;
            x = -height/(2*k)+x1;
        }
        x+=offset;
    }else if(Math.abs(k)<p){

        if(x2>x1){
            x = x1+width/2;
            y = width*k/2+y1;
        }else{
            x = x1-width/2;
            y = -width*k/2+y1;
        }
        y+=offset;
    }else{
        if(x1>x2 && y1>y2){
            if(offset>0){
                y = y1-height/2;
                x = -height/(2*k)+x1+offset;
            }else{
                x = x1 -width/2;
                y = -width*k/2+y1-offset;
            }
        }else if(x1>x2 && y1<y2){
            if(offset>0){
                y = y1 + height/2;
                x = height/(2*k) + x1 +offset;
            }else{
                x = x1 - width/2;
                y = -width*k/2 + offset
            }
        }else if(x1<x2 && y1>y2){
            if(offset>0){
                x = x1 + width/2;
                y = width*k/2 + y1 + offset;
            }else{
                y = y1 - height/2;
                x = -height/(2*k) + x1 + offset;
            }
        }else{
            if(offset>0){
                x = x1 + width/2;
                y = width*k/2 + y1 - offset;
            }else{
                y = y1 + height/2;
                x = height/(2*k) + x1 +offset;
            }
        }
    }

    let node = new JTopo.Node();
    node.setLocation(x,y);
    node.setSize(1,1);
    return node;
}

class CloudContainer extends JTopo.Node{

    constructor(interval=10){
        super();
        this.interval = interval;
        this.nodes = [];
        this.layoutWidth = this.width;
        this.layoutHeight = this.height;
    }

    addNode(n){
        this.nodes.push(n);
    }

    setLayoutSize(width,height, subWidth, subHeight){
        if(width<=1)
            this.layoutWidth = this.width*width;
        else
            this.layoutWidth = width;
        if(height<=1)
            this.layoutHeight = this.height*height;
        else
            this.layoutHeight = height;
        this.subWidth = subWidth;
        this.subHeight = subHeight;
    }

    inflate(){
        if(this.nodes.length==0)
            return;
        let wNum = Math.floor(this.layoutWidth/(this.subWidth+this.interval));
        let hNum = Math.floor(this.layoutHeight/(this.subHeight+this.interval));
        let hNum1 = Math.ceil(this.nodes.length/wNum);
        hNum = Math.min(hNum, hNum1);

        let length = Math.min(this.nodes.length, hNum*wNum);

        for(var i=0; i<length;i++){
            let x = i%wNum;
            let y = Math.floor(i/wNum);
            let num = wNum;
            if(y==hNum-1 && length%num>0)
                num = length%wNum;
            let rest = (this.layoutWidth - num*this.subWidth - (num-1)*this.interval)/2;
            x = this.x + rest + this.subWidth/2 + x*(this.subWidth + this.interval);
            y = this.y + rest + this.subHeight/2 + y*(this.subHeight+this.interval);

            this.nodes[i].setCenterLocation(x,y);
        }
    }
}

export default class PhysicTopo extends Component{

    componentDidMount(){
        let canvas = ReactDOM.findDOMNode(this);
        this.stage = new JTopo.Stage(canvas);
        this.scene = new JTopo.Scene(this.stage);
        this.stage.click(this.props.stageClick);
        this.refreshTopo();
    }

    componentDidUpdate(prevProps, prevState){
        this.refreshTopo();
    }

    // addLink(src,dest){
    //     // if(nodeP && nodeC) {
    //     //     var link = new JTopo.FlexionalLink(nodeP, nodeC);
    //     //     link.strokeColor = '204,204,204';
    //     //     link.lineWidth = 1;
    //     //     this.scene.add(link);
    //     //     return link;
    //     // }
    //     let srcNode = this.scene.findElements(e => e.id == src.id);
    //     let destNode = this.scene.findElements(e => )
    //
    // }

    addNode(e,adapter){
        var node = new JTopo.Node(e.text);
        node.clickHandler(this.props.onClick);
        node.id = e.id;
        if(adapter)
            adapter(e,node);
        this.scene.add(node);
        return node;
    }

    refreshTopo(){
        if(this.props.model) {
            this.scene.clear();
            const circleX = this.props.width/2;
            const circleY = this.props.height/2;
            const radius = Math.min(this.props.width, this.props.height)/4;
            const nodeSize = this.props.model.length;
            const initD = getInitDegree(nodeSize);
            // let netUnitNodes = [];
            this.props.model.forEach((e, index) => {

                let x=0,y=0;
                let direct = 'bottom';
                let textPosition = '';
                let node = new JTopo.Node(e.name);
                if(nodeSize>1) {
                    let degree = initD + index * 2 / nodeSize;
                    x = radius * Math.cos(degree * Math.PI);
                    y = radius * Math.sin(degree * Math.PI);
                    direct = getDirection(degree);
                    textPosition = getTextPosition(degree);
                }
                x += circleX;
                y += circleY;

                node.setSize(70,70);
                node.textPosition = textPosition;
                node.fontColor = '0.0.0';
                node.setImage('static/img/netunit.png', false);
                node.setCenterLocation(x,y);
                node.layout = {
                    type: 'tree',
                    direction: direct,
                    width: 50,
                    height: 90
                };

                node.click((event) => this.props.onClick(e, index, node, event));
                node.mouseup((event) => {
                    if(event.button == 2)
                        this.props.rightClick(e, index, node, event);
                });
                node.type = 'netunit';
                node.id = e.id;
                if(this.props.adapter)
                    this.props.adapter(e,node);

                // netUnitNodes.push(node);
                this.scene.add(node);

                if(e.devices && e.devices instanceof Array){

                    if(e.devices.length>this.props.deviceLimitCount){
                        var container = new CloudContainer();
                        container.netunit = e.id;
                        container.type = 'container';
                        container.setSize(180,100);
                        container.setLayoutSize(1,1,40,40);
                        this.props.containerAdapter(e,container,index);
                        container.click(event=>this.props.onClick(e,index,container,event));
                        node.layout.width=200;
                        node.layout.height=200;
                        let subDevices = e.devices.slice(0,this.props.deviceLimitCount);
                        subDevices.forEach((d,index) => {
                            var deviceNode = new JTopo.CircleNode(d.name);
                            deviceNode.radius = 12;
                            deviceNode.id = d.id;
                            deviceNode.textPosition = 'Bottom_Center';
                            deviceNode.fontColor = '0,0,0';
                            deviceNode.type = 'device';
                            deviceNode.netunit = e.id;
                            deviceNode.zIndex = 20;
                            this.props.deviceAdapter(d, deviceNode);

                            deviceNode.click(event => this.props.onClick(e,index,deviceNode,event));
                            this.scene.add(deviceNode);
                            container.addNode(deviceNode);
                        });
                        let link = new JTopo.Link(node, container);
                        this.scene.add(link);
                        this.scene.add(container);
                        JTopo.layout.layoutNode(this.scene, node, true);
                        container.inflate();
                    }else {

                        e.devices.forEach((d, index) => {
                            var deviceNode = new JTopo.CircleNode(d.name);
                            deviceNode.radius = 12;
                            deviceNode.id = d.id;
                            deviceNode.textPosition = 'Bottom_Center';
                            deviceNode.fontColor = '0,0,0';
                            deviceNode.type = 'device';
                            deviceNode.netunit = e.id;
                            let link = new JTopo.Link(node, deviceNode);

                            deviceNode.click(event => this.props.onClick(e, index, deviceNode, event));
                            this.props.deviceAdapter(d, deviceNode, link);
                            this.scene.add(deviceNode);
                            this.scene.add(link);
                        });
                        JTopo.layout.layoutNode(this.scene, node, true);
                    }
                }

            });

            if(this.props.connect){
                this.props.connect.forEach((connect) => {
                    let srcNodes = this.scene.findElements(e => e.type == 'netunit' && e.id == connect.srcId);
                    let destNodes = this.scene.findElements(e => e.type == 'netunit' && e.id == connect.destId);
                    if(srcNodes && srcNodes.length > 0
                        && destNodes && destNodes.length > 0){

                        let offset = 10;
                        if(connect.srcId<connect.destId)
                            offset = -10;

                        let srcNode = surfaceSite(srcNodes[0], destNodes[0], offset);
                        let destNode = surfaceSite(destNodes[0], srcNodes[0], offset);
                        var link = new JTopo.Link(srcNode, destNode);
                        link.arrowsRadius = 10;


                        if(this.props.connectAdapter)
                            this.props.connectAdapter(link,connect);
                        this.scene.add(srcNode);
                        this.scene.add(destNode);
                        this.scene.add(link);

                    }
                });
            }

            //this.scene.doLayout(JTopo.layout.TreeLayout('down', 50, 120));
        }
    }

    
    getNodeById(id){
        var elements = this.scene.findElements(function(e){return e.id == id})
        return elements[0];
    }

    render(){
        return <canvas width={this.props.width} height={this.props.height} />;
    }
}

PhysicTopo.PropTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    deviceLimitCount: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    rightClick: PropTypes.func.isRequired,
    stageClick: PropTypes.func.isRequired,
    model: PropTypes.array.isRequired,
    adapter: PropTypes.func.isRequired,
    connect: PropTypes.func.isRequired,
    connectAdapter: PropTypes.func.isRequired,
    containerAdapter: PropTypes.func.isRequired,
    deviceAdapter: PropTypes.func.isRequired
};

PhysicTopo.defaultProps = {
    width: $(document).width,
    height: $(document).height,
    deviceLimitCount: 3,
    onClick: NOP,
    rightClick: NOP,
    stageClick: NOP,
    model: [],
    adapter: NOP,
    connect: NOP,
    connectAdapter: NOP,
    deviceAdapter: NOP,
    containerAdapter: (e,n)=>{
        n.setImage(cloudImg[0]);
    }
};