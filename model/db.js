const mysql = require('mysql');
//配置连接项
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  database : 'blogNode'
});
 //创建实例
 connection.connect();
//暴露出去的查询方法
let query = (...args)=>{
  //参数不固定
  connection.query(...args);
}

module.exports = query;

 //关闭链接
// connection.end();