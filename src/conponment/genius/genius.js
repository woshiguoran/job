import React from 'react';
import { connect } from 'react-redux'
import { getUserList } from '../../reducer/chatuser.redux'
import UserCard from "../usercard/usercard";

@connect(
    state => state.chatUser,
    {getUserList}
)
class Genius extends React.Component{

    componentDidMount(){
        this.props.getUserList('boss');
    }

    render(){
        console.log(this.state);
        return (
            <UserCard userlist={this.props.userlist}/>
        )
    }
}

export default Genius
