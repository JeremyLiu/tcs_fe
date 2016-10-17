import React from 'react'

export var RightSwitch = React.createClass({

    getInitialState(){
      return {
          select: this.props.select,
      }
    },

    getDefaultProps(){
        return {
            label: '',
            select: false,
            onChanged: () => {}
        }
    },

    componentWillReceiveProps(nextProps){
        if(nextProps.select!=this.state.select)
            this.setState({
                select: nextProps.select
            })
    },

    handleChange(event){
        let select = event.target.checked;
        this.props.onChanged(select);
        this.setState({
            select: select
        });

    },
    render(){
        let {label, children} = this.props;
        return <div className="form-group">
                    <div className="left-float">
                        <label className="label-nm-3">
                        <input type="checkbox" className="left-float" onChange={this.handleChange}
                               checked={this.state.select?'checked':''}/>{label}</label>
                    </div>
                    {children}
                </div>
    }
});

var EnableSwitch = React.createClass({

    getInitialState(){
        return {
            right: this.props.right,
            enable: this.props.enable
        }
    },

    getDefaultProps(){
        return {
            right: false,
            enable: false,
            rightLabel: '',
            enableLabel: '',
            rightKey: 'right',
            enableKey: 'enable',
            onChange: ()=>{}
        }
    },

    componentWillReceiveProps(nextProps){

        if(nextProps.right!=this.state.right || nextProps.enable!=this.state.enable)
            this.setState({
                right: nextProps.right,
                enable: nextProps.enable
            })
    },

    handleRightChange(select){
        let newState = {};
        newState[this.props.rightKey] = select;
        this.props.onChange(newState);
        this.setState({right: select});
    },
    handleEnableChange(event){
        let select =  event.target.checked;
        let newState = {};
        newState[this.props.enableKey] = select;
        this.props.onChange(newState);
        this.setState({enable: select});
    },

    render(){
        let {rightLabel, enableLabel, children} = this.props;
        let {right, enable} = this.state;
        return <RightSwitch label={rightLabel} select={right} onChanged={this.handleRightChange}>
            <div className="left-float">
                <label className="label-nm-3">
                <input type="checkbox" onChange={this.handleEnableChange} className="left-float"
                       checked={enable?'checked':''} disabled={right?'':'disabled'}/>
                {enableLabel}</label>
            </div>
            {children}
        </RightSwitch>
    }
});

EnableSwitch.PropTypes= {
    right: React.PropTypes.bool,
    enable: React.PropTypes.bool,
    rightLabel: React.PropTypes.string,
    enableLabel: React.PropTypes.string,
    rightKey: React.PropTypes.string,
    enableKey: React.PropTypes.string,
    onChange: React.PropTypes.func
};

export default EnableSwitch;