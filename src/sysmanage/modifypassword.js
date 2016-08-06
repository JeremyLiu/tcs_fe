import React, {PropTypes} from 'react'
import {post_modify_password} from '../action/user.js'

var ModifyPassowrd = React.createClass({

    handleSubmit(){
        let {oldPassword,newPassword, submit} = this.refs;
        submit.textContent = "正在提交";
        submit.disabled = true;
        post_modify_password(newPassword.value,oldPassword.value,
            (data) => {
                if(data.status == 0)
                    alert("修改成功");
                else
                    alert("修改失败");
                submit.textContent = "提交";
                submit.disabled = false;
                oldPassword.value = "";
                newPassword.value = "";
        });
    },
    
    render(){
        return <div style = {{margin: 40}}>
            <form className="form-horizontal"  autoComplete="off">
                <div className="form-group">
                    <label className="label-3">输入旧密码: </label>
                    <input ref="oldPassword" type="password"/>
                </div>
                <div className="form-group">
                    <label className="label-3">输入新密码: </label>
                    <input ref="newPassword" type="password"/>
                </div>
                <div className="form-group">
                    <button ref="submit" className="btn btn-default" type="button" onClick={this.handleSubmit}>提交</button>
                </div>
            </form>
        </div>;
    }
});

export default ModifyPassowrd;