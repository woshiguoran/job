import React from 'react'
import Logo from "../../conponment/logo/logo";
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import '../../index.css'
import { connect } from 'react-redux'
import { login } from "../../reducer/user.redux";
import { Redirect } from 'react-router-dom'
import imoocFrom from '../../conponment/imooc-from/imooc-from'

//3引入login connect
@connect(
    state => state.user,
    {login}
)
@imoocFrom
class Login extends React.Component{
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    register(){
        console.log('跳转到注册页~');
        this.props.history.push('/register');
    }

    componentDidMount(){
        this.props.handleChange;
    }

    handleLogin(){
        this.props.login(this.props.state);
    }

    render(){
        const path = this.props.location.pathname;
        const redirectTO = this.props.redirectTO;
        return (
            <div>
                {redirectTO && redirectTO!== path ? <Redirect to={redirectTO} /> : null}
                <Logo />
                <WingBlank>
                    {this.props.msg ? <p className="errorMsg">{this.props.msg}</p> : null}
                    <List>
                        <InputItem
                            onChange={v=>this.props.handleChange('user', v)}
                        >用户名</InputItem>
                        <InputItem
                            type="password"
                            onChange={v=>this.props.handleChange('pwd', v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;