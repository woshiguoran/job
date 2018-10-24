import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { ADD_gun, SUB_gun, ADD_gun_timeout, getUserData } from "./redux/index.redux";

//使用装饰器
@connect(
    state => {
        return {num: state.counter}
    },
    {ADD_gun, SUB_gun, ADD_gun_timeout, getUserData}
)

class App extends React.Component {
    componentDidMount(){
       this.props.getUserData();
    }
    render() {
        const gun = this.props.num;
        const ADD_gun = this.props.ADD_gun;
        const SUB_gun = this.props.SUB_gun;
        const ADD_gun_timeout = this.props.ADD_gun_timeout;
        return (
            <div>
                <h2>现在独立团拥有机枪 {gun} 把</h2>
                <button onClick={()=>ADD_gun()}>添加军需</button>
                <button onClick={()=>SUB_gun()}>减少军需</button>
                <button onClick={()=>ADD_gun_timeout()}>拖两天再给</button>
            </div>
        );
    }
}
// mapStateToProps（state, ownProps）
// mapStateToProps可以不传，如果不传，组件不会监听store的变化，也就是说Store的更新不会引起UI的更新
// mapStateToProps是一个函数，用于建立组件跟 store 的 state 的映射关系
// 每次store的state发生变化时会被调用
//未使用装饰器
/*const mapStateToProps = (state)=>{
    return {num: state}
};
//将多个action绑定为一个
const actionCreators = {ADD_gun, SUB_gun, ADD_gun_timeout, getUserData};
App = connect(mapStateToProps, actionCreators)(App);*/
export default App;