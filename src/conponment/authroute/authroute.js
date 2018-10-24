import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {loadData } from '../../reducer/user.redux'
import { connect } from 'react-redux'

@withRouter
@connect(
    null,
    { loadData }
)
class AuthRoute extends React.Component{
    componentDidMount() {
        //判断是否为登录注册页
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        // 获取用户信息
        axios.get('/user/info').
        then(res=>{
            if (res.status==200) {
                if(res.data.code == 0){
                    //有登录信息
                    this.props.loadData(res.data.data);
                }else{
                    //判断是否为登录注册页 强制转换
                    if(publicList.indexOf(pathname)==-1){
                        this.props.history.push('/login');
                    }
                }
            }
        });
    }
    render(){
        return null
    }

}
export default AuthRoute;



























/*
import React from 'react'
import axios from 'axios'
//登录注册的判断路由

class AuthRoute extends React.Component{
    componentDidMount() {
        //获取用户信息

        axios.get('/user/info')
            .then(res=>{
                if(res.status==200){
                    console.log(res.data);
                }
                console.log('lalalalallal',res);
            })
            .catch(function (error) {
                console.log(error);
            });
        /!*是否登录
        * 现在的url地址 是否为login
        * type类型
        * 用户信息是否完善*!/
    }
    render(){
        return <p>判断跳转</p>
    }
}

export default AuthRoute;*/
