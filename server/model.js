const mongoose = require('mongoose');
//链接mongo
const DB_URL = 'mongodb://localhost:27017/imooc-chat'; //建立文件
mongoose.connect(DB_URL, { useNewUrlParser: true });

//定义模型组
const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        //头像
        'avatar': {type: String},
        //个人简介或职位介绍
        'desc': {type: String},
        'title': {type: String},
        //boss的字段
        'company': {type: String},
        'money': {type: String}
    },
    chat: {}
};
//动态生成模型
for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}; //下一步去往server