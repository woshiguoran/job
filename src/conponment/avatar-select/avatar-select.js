import React from  'react'
import { Grid, List } from 'antd-mobile';
import propTypes from 'prop-types'

class AvatarSelect extends React.Component{
    static propTypes = {
        selectAvatar: propTypes.array.required //规定传的值必须为function 且非空
    };
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v=>({
                icon: require(`../img/${v}.png`),
                text:v
            }))
        ;
        const gridHeader = this.state.text ? <div><span>您已选择头像</span><img style={{width:20, marginLeft: "10px"}} src={this.state.icon} alt=""/></div>: <div><span>请选择头像</span></div>
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelect