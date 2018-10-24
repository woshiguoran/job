const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

//新建app
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());//这样就可以接收post的参数
app.use('/user',userRouter); //开启一个中间件 先设置入口目录前缀
app.listen(9093,function () {
    console.log('Node app start at 9093')
});




