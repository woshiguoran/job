import React from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import propTypes from 'prop-types'

class UserCard extends React.Component{
    static propTypes = {
        selectAvatar: propTypes.array.required
    };
    render(){
        return (
            <WingBlank>
                {this.props.userlist.map(v=>(
                    v.avatar?(
                        <div key={v._id}>
                            <WhiteSpace/>
                            <Card>
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`../img/${v.avatar}.png`)}
                                    extra={<span>{v.title}</span>}
                                />
                                <Card.Body>
                                    {v.type=='boss' ? <div><span>公司名称：</span>{v.company}</div> : null}
                                    <br/>
                                    {v.desc.split('\n').map(k=>(
                                        <div key={k}>{k}</div>
                                    ))}
                                    <br/>
                                    {v.type=='boss' ? <div><span>最低薪资：</span>{v.money}</div> : <div><span>期望薪资：</span>{v.money}</div>}
                                </Card.Body>

                            </Card>
                        </div>
                    ):null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard