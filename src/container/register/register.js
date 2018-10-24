import React from 'react'
import Logo from "../../conponment/logo/logo";
import '../../style/register.css'
import { List,  InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from "../../reducer/user.redux";
import { Redirect } from 'react-router-dom'
import imoocFrom from "../../conponment/imooc-from/imooc-from";

@connect(
    state => state.user,
    {register}
)
@imoocFrom
class Register extends React.Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount(){
        this.props.handleChange('type','genius');
    }

    handleRegister(){
        this.props.register(this.props.state);
    }

    login(){
        console.log('跳转到登录页~');
        this.props.history.push('/login');
    }



    render(){
        const RadioItem = Radio.RadioItem;

        return(
            <div>
                {this.props.redirectTO ? <Redirect to={this.props.redirectTO} /> : null}
                <Logo />
                <WingBlank>
                    {this.props.msg ? <p className="errorMsg">{this.props.msg}</p> : null}
                    <List>
                        <InputItem
                            onChange={(v)=>{this.props.handleChange('user', v)}}
                        >用户名</InputItem>
                        <InputItem
                            type='password'
                            onChange={(v)=>{this.props.handleChange('pwd', v)}}
                        >密码</InputItem>
                        <InputItem
                            type='password'
                            onChange={(v)=>{this.props.handleChange('pwdRe', v)}}
                        >确认密码</InputItem>
                        <RadioItem
                            defaultChecked
                            checked={this.props.state.type === 'genius'}
                            onChange={()=>{this.props.handleChange('type', 'genius')}}
                        >牛人</RadioItem>
                        <RadioItem
                            checked={this.props.state.type === 'boss'}
                            onChange={()=>{this.props.handleChange('type', 'boss')}}
                        >BOSS</RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                    <WhiteSpace />
                    <Button onClick={this.login}  type="primary">登录</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;