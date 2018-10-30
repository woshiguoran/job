import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, resvMsg } from '../../reducer/chat.redux'
import {getChatId} from "../../util";

@connect(
    state=>state,
    { getMsgList, sendMsg, resvMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {text: '',msg: []};
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.resvMsg();
        }
    }
    handleSubmit(){
        const from = this.props.user._id,
              to = this.props.location.pathname.split('/chat/')[1],
              msg = this.state.text;
        //发送redux的函数
        this.props.sendMsg({from, to, msg});
        this.setState({text: ''});
    }

    render(){
        const Item = List.Item;
        const user = this.props.location.pathname.split('/chat/')[1];
        const users = this.props.chat.users;

        if(!users[user]){
            return null;
        }
        const chatId = getChatId(user, this.props.user._id);
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatId == chatId);

        return(
            <div className="chat-page">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>{this.props.history.goBack()}}
                >{users[user].name}</NavBar>
                <div className="lists">
                    {chatmsgs.map(v=>{
                        const avatar = require(`../img/${users[v.from].avatar}.png`);
                        return v.from == user ? (
                            <List key={v._id}>
                                <Item thumb={avatar}>{v.content}</Item>
                            </List>
                        ) : (
                            <List key={v._id}>
                                <Item
                                    className="chat-me"
                                    extra={<img src={avatar}/>}
                                >{v.content}</Item>
                            </List>
                        )})
                    }
                </div>

                <div className="am-tab-bar">
                    <List>
                        <InputItem
                            placeholder="请输入你想要说的话"
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
                        >信息</InputItem>
                    </List>
                </div>
            </div>
        )
    }
}
export default Chat