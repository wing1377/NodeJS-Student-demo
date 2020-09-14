// 引入http模块
const http = require('http');
// 引入path模块
const path = require('path');

// 引入静态资源访问服务
const serveStatic = require('serve-static');
// 调用方法，实现静态资源访问服务
const serve = serveStatic(path.join(__dirname, 'public'));

// 引入日期处理模块
const dateformat = require('dateformat');
// 引入模板引擎
const template = require('art-template');
// 配置模板根目录
template.defaults.root = path.join(__dirname, 'views');
// 处理日期格式的方法
template.defaults.imports.dateformat = dateformat;

// 引入路由
const router = require('./route/index');
// 数据库连接
require('./model/connect');

// 创建网站服务器
const app = http.createServer();
// 当客户端访问服务器端的时候
app.on('request', (req, res) => {
    // 启动路由功能
    router(req, res, () => {
        console.log('路由成功！');
    })
    // 启动静态资源访问服务功能
    serve(req, res, () => {
        console.log('静态资源配置成功！');
    });
})

app.listen(80);
console.log('网络服务器已开启');