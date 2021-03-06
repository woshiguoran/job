const express = require('express');
const utils = require('utility');

const Router = express.Router();
const models = require('./model'); //引入model
const User = models.getModel('user');
const Chat = models.getModel('chat');
const _filter = {'pwd': 0, '__v':0};

Router.get('/list', function (req, res) {
    // const type = req.query.type;
    const { type } = req.query;
    User.find({type},function (err, doc) {
        return res.json({code: 0, data: doc});
    })
});
//获得聊天列表
Router.get('/getmsglist', function (req, res) {
    const user = req.cookies.userId;
    User.find({},function (e, userdoc) {
        let users = {};
        userdoc.forEach(v=>{
            users[v._id] = {name: v.user, avatar: v.avatar}
        });

        Chat.find({'$or':[{from: user},{to: user}]},function (err, doc) {
            if(!err){
                return res.json({code: 0, data: doc, users: users});
            }
        })
    });

});
//设计信息完善
Router.post('/update', function (req, res) {
    //得到cookies
    const userId = req.cookies.userId;
    if(!userId){
        return json.dumps({code: 1})
    }
    const body = req.body;
    User.findByIdAndUpdate(userId,body,function (err, doc) {
        const data = Object.assign({},{
            user: doc.user,
            type: doc.type
        },body);
        return res.json({code: 0, data})
    });

});
//设计登录功能
Router.post('/login', function (req, res) {
    const {user, pwd} = req.body;
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if(!doc){
            return res.json({code: 1, msg: '用户名不存在或密码错误'});
        }
        //cookie写入
        res.cookie('userId',doc._id);
        return res.json({code: 0, data: doc})
    })
});
//设计注册功能
Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body;
    //清空数据库
    // User.remove({},function (e,d) {});
    User.findOne({user}, function (err, doc) {
        if(doc){
            return res.json({code: 1, msg: '用户名重复'});
        }

        const userModel = new User({user,type,pwd:md5Pwd(pwd)});
        userModel.save(function(e,d){
            if (e) {
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user, type, _id} = d;
            res.cookie('userId', _id);
            return res.json({code:0,data:{user, type, _id}})
        })
    })
});

Router.get('/info',function(req, res) { //添加info的路由
    //查找cookie
    const {userId} = req.cookies;
    if(!userId) {
        return res.json({code: 1});
    }
    User.findOne({ _id: userId},_filter,function (err,doc) {
        if(err){
            return res.json({code: 1, msg: '后端出错了'});
        }
        if(doc){
            return res.json({code: 0,data: doc})
        }
    });
});
//密码加密
function md5Pwd(pwd){
    const salt = '!@%&UM*I()_*(*&%$###$%^&(*)(lalal';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
