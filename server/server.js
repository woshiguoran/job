const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const models = require('./model'); //引入model
const Chat = models.getModel('chat');

// Chat.remove({},function (err, doc) {});

//新建app
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection',function (socket) {
    socket.on('sendmsg',function (data) {
        const {from, to, msg} = data;
        const chatId = [from, to].sort().join('_');
        Chat.create({chatId, from, to, content: msg},function (err, doc) {
            io.emit('resvMsg', Object.assign({},doc._doc))
        });
        // io.emit('recvMsg',data);
        // console.log(data);
    })
});

app.use(cookieParser());
app.use(bodyParser.json());//这样就可以接收post的参数
app.use('/user',userRouter); //开启一个中间件 先设置入口目录前缀
server.listen(9093,function () {
    console.log('Node app start at 9093')
});




