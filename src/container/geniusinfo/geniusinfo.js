import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelect from "../../conponment/avatar-select/avatar-select";
import { connect } from 'react-redux'
import { update } from "../../reducer/user.redux";
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    { update }
)

class GeniusInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            avatar:'',
            title: '',
            money:'',
            desc:'',
        }
    }

    onChange(key, val){
        this.setState({
            [key]: val
        })
    }

    render(){
        const path = this.props.location.pathname;
        const redirectTO = this.props.redirectTO;
        return (
            <div>
                {redirectTO && redirectTO!== path ? <Redirect to={redirectTO} /> : null}
                <NavBar
                    mode="dark"
                >牛人完善信息页</NavBar>
                <AvatarSelect
                    selectAvatar={(imgname)=>{
                        this.setState({
                            avatar: imgname
                        });
                        console.log(this.state);
                    }}
                />
                <InputItem
                    onChange={(v)=>this.onChange('title',v)}
                >期望职位
                </InputItem>
                <InputItem
                    onChange={(v)=>this.onChange('money',v)}
                >期望薪资
                </InputItem>
                <TextareaItem
                    title="个人简介"
                    placeholder="请输入个人简介"
                    onChange={(v)=>this.onChange('desc',v)}
                    rows={3}
                    autoHeight
                />
                <Button
                    type="primary"
                    onClick={()=>{this.props.update(this.state)}}>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo
