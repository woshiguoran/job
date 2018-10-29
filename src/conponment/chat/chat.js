import React from 'react'
import { List, InputItem, NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, resvMsg } from '../../reducer/chat.redux'

@connect(
    state=>state,
    { getMsgList, sendMsg, resvMsg }
)
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {text: '',msg: []};
    }
    componentDidMount(){
        this.props.getMsgList(); //-->server.js中新建查询链接
        this.props.resvMsg();
       /* socket.on('recvMsg', (data)=> {
            this.setState({
                msg: [...this.state.msg, data.text]
            });
            console.log(data);
        });*/
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
        const user = this.props.user._id;
        return(
            <div className="chat-page">
                <NavBar mode="dark">{this.props.location.pathname.split('/chat/')[1]}</NavBar>
                <List>
                    {this.props.chat.chatmsg.map(v=>{
                        return v.from != user ? (
                            <Item key={v._id}>{v.content}</Item>
                        ) : (
                            <Item
                                key={v._id}
                                className="chat-me"
                                extra={'avtra'}
                            >{v.content}</Item>
                        )})
                    }
                </List>

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