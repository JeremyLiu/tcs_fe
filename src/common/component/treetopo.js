import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'


export default class Tree extends Component{

    componentDidMount(){
        let canvas = ReactDOM.findDOMNode(this);
        this.stage = new JTopo.Stage(canvas);
        this.scene = new JTopo.Scene(this.stage);
        this.refreshStage();
    }

    componentDidUpdate(prevProps, prevState){
        this.refreshStage();
    }

    addLink(nodeP,nodeC){
        if(nodeP && nodeC) {
            var link = new JTopo.FlexionalLink(nodeP, nodeC);
            link.strokeColor = '204,204,204';
            link.lineWidth = 1;
            this.scene.add(link);
            return link;
        }
        return null;
    }

    addNode(e,adapter){
        var node = new JTopo.Node(e.text);
        node.clickHandler(this.props.onClick);
        node.id = e.id;
        if(adapter)
            adapter(e,node);
        this.scene.add(node);
        return node;
    }

    refreshStage(){
        if(this.props.model) {
            this.scene.clear();
            this.props.model.forEach((e) => {
                let node = this.addNode(e, setTreeNodeData);
                if (e.parent) {
                    let parent = this.getNodeById(e.parent);
                    this.addLink(parent, node);
                }
            });
            this.scene.doLayout(JTopo.layout.TreeLayout('down', 50, 120));
        }
    }

    getNodeById(id){
        var elements = this.scene.findElements(function(e){return e.id == id})
        return elements[0];
    }

    render(){
        return( <canvas width={this.props.width} height={this.props.height} />);
    }
}

Tree.PropTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    model: PropTypes.array.isRequired
};

function setTreeNodeData(e, node){
    node.textPosition = 'Middle_Center';
    node.fillColor = '0,255,0';
    node.setSize(50,30);
}

// function getNodeById(scene, id){
//     var elements = scene.findElements(function(e){return e.id == id})
//     return elements[0];
// }