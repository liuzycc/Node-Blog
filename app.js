const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const path = require('path');
const artTemplate = require('express-art-template');

const app = express();

//配置bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//开放静态资源
app.use('/public',express.static(path.join(__dirname,'./node_modules')));
app.use('/public',express.static(path.join(__dirname,'./public')));

//配置template
app.engine('html',artTemplate);//后缀名必须是html  视图的根目录默认是views
app.set('view options', {
  imports:{
    moment:moment,
  }
});


app.listen(3000,()=>{
  console.log("Run......blog");
  
});

// //引入mysql
// const mysql = require('./model/db');
// mysql("select * from users",function(err,data){
//   console.log(data);
// })

//路由定制
//前台路由
const homeRouter = require('./constroller/homeRouter');
app.use(homeRouter);
//后台管理路由