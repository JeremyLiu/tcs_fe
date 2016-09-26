import React, { Component, PropTypes } from 'react'
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import ReactDOM from 'react-dom'


function getInitDegree(n){

    if(n <= 0)
        return 0;
    if(n%2 != 0)
        return -1/2;
    else
        return 1/2 + 1/n;
}

function getDirection(d){
    d = d % 2;
    if(d < 0 || d>5/4 && d<7/4)
        return 'top';
    else if(d>1/4 &&d <3/4)
        return 'bottom';
    else if(d>=3/4 && d<=5/4)
        return 'left';
    else
        return 'right';
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
            const radius = Math.min(this.props.width, this.props.height)/3;
            const nodeSize = this.props.model.length;
            const initD = getInitDegree(nodeSize);
            // let netUnitNodes = [];

            this.props.model.forEach((e, index) => {

                let x=0,y=0;
                let direct = 'bottom';
                let node = new JTopo.Node(e.name);
                if(nodeSize>1) {
                    let degree = initD + index * 2 / nodeSize;
                    x = radius * Math.cos(degree * Math.PI);
                    y = radius * Math.sin(degree * Math.PI);
                    direct = getDirection(degree);
                }
                x += circleX;
                y += circleY;


                node.setLocation(x,y);
                node.layout = {
                    type: 'tree',
                    direction: direct,
                    width: 50,
                    height: 90
                };
                node.setSize(70,70);
                node.textPosition = 'Bottom_Center';
                node.fontColor = '0.0.0';
                node.setImage('static/img/netunit.png', false);
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
                    e.devices.forEach((e) => {
                        var deviceNode = new JTopo.CircleNode(e.name);
                        deviceNode.radius = 12;
                        deviceNode.id = e.id;
                        deviceNode.textPosition = 'Bottom_Center';
                        deviceNode.fontColor = '0,0,0';
                        deviceNode.type = 'device';

                        let link = new JTopo.Link(node,deviceNode);


                        if(this.props.deviceAdapter)
                            this.props.deviceAdapter(e,deviceNode,link);
                        this.scene.add(deviceNode);
                        this.scene.add(link);
                    })
                }


                JTopo.layout.layoutNode(this.scene, node, true);

            });

            if(this.props.connect){
                this.props.connect.forEach((connect) => {
                    let srcNodes = this.scene.findElements(e => e.type == 'netunit' && e.id == connect.srcId);
                    let destNodes = this.scene.findElements(e => e.type == 'netunit' && e.id == connect.destId);
                    if(srcNodes && srcNodes.length > 0
                        && destNodes && destNodes.length > 0){
                        // for(var i=0;i<2;i++)
                        // let otherLink = new JTopo.Link(srcNodes[0], destNodes[0]);
                        // otherLink.strokeColor = '255,255,255';
                        // otherLink.alpha = 0.2;
                        // otherLink.arrowsRadius = 0;

                        // this.scene.add(otherLink);
                        var link = new JTopo.CurveLink(srcNodes[0], destNodes[0]);
                        link.arrowsRadius = 10;
                        // link.arrowsOffset = 0;
                        // link.bundleGap = 10;
                        // link.bundleOffset = 5;
                        if(this.props.connectAdapter)
                            this.props.connectAdapter(link,connect);
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
    onClick: PropTypes.func.isRequired,
    rightClick: PropTypes.func.isRequired,
    stageClick: PropTypes.func.isRequired,
    model: PropTypes.array.isRequired,
    adapter: PropTypes.func.isRequired,
    connect: PropTypes.func.isRequired,
    connectAdapter: PropTypes.func.isRequired,
    deviceAdapter: PropTypes.func.isRequired
};