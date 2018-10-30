import React from 'react';
import { Route , Switch} from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import NavLinkBar from "../navlinkbar/navlinkbar";
import { connect } from 'react-redux'
import '../../index.css'
import Boss from "../boss/boss";
import Genius from "../genius/genius";
import Msg from "../msg/msg";
import User from "../user/user";
import {getMsgList, resvMsg, sendMsg} from "../../reducer/chat.redux";

class Error extends React.Component{
    render(){
        return (
            <div>
                <h2>未找到{this.props.match.params.location}该页面</h2>
            </div>
        )
    }
}

@connect(
    state => state,
    { getMsgList, sendMsg, resvMsg }
)

class Dashboard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length) {
            this.props.getMsgList(); //-->server.js中新建查询链接
            this.props.resvMsg();
        }
    }
    render(){
        const {pathname} = this.props.location;

        //得到登录人员类型
        const user =  this.props.user;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type=='genius'
            }, {
                path: '/genius',
                text: 'boss',
                icon: 'boss',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type=='boss'
            }, {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,
            }, {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            },
        ];
        return (
            <div>
                {navList.find(v=>v.path==pathname) ?
                    <div>
                        <NavBar
                            className='fixed-header'
                            mode="dark"
                        >{navList.find(v=>v.path==pathname).title}</NavBar>

                        <div style={{marginBottom: 70}}>
                            <Switch>
                                {navList.map(v=>(
                                    <Route key={v.path} path={v.path} component={v.component} />
                                ))}
                                <Route path="/:location" component={Error} />
                            </Switch>
                        </div>

                        <NavLinkBar data={navList}/>
                    </div>
                    :
                    <Route path="/:location" component={Error} /> }
            </div>
        )
    }
}

export default Dashboard