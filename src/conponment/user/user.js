import React from "react";
import { connect } from "react-redux"
import { Result, WhiteSpace , List, Modal } from "antd-mobile";
import browserCookies from 'browser-cookies'
import { logout} from "../../reducer/user.redux";
import { Redirect } from 'react-router-dom'


@connect(
    state=>state.user,
    {logout}
)

class User extends React.Component{
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);

    }

    logOut(){
        const alert = Modal.alert;
        alert('退出登录', '您确定退出登录?', [
            { text: '不是很确定', onPress: () => console.log('取消') },
            { text: '确定', onPress: () => {
                    browserCookies.erase('userId');
                    this.props.logout(this.state);
                    console.log('退出登录')
                }
            },
        ]);
    }

    render(){
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} alt="用户头像" style={{width: 50}}/>}
                    title={props.user}
                    message={<div>{props.company ? props.company: null }</div>}
                />
                <WhiteSpace />
                <List renderHeader={() => '用户简介'} className="my-list">
                    <Item>
                        {props.title}
                        {props.desc.split('\n').map((v,i)=><Brief key={i}>{v}</Brief>)}
                        <Brief>{props.company ? '最低薪资' : '期望薪资'}{props.money}</Brief>
                    </Item>
                </List>
                <WhiteSpace />
                <List onClick={this.logOut}>
                    <Item>退出登录</Item>
                </List>
            </div>
        ) : <div>{props.redirectTO ? <Redirect to={props.redirectTO} /> : null}</div>
    }
}

export default User