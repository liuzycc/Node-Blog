const db = require('./db');

/**
 * 获取文章分页数据列表
 */
exports.findPostPager = (page,pageSize,cb) => {
  //分页数据 LIMIT 4,10  
  //从第4条数据开始 往后取10条数据  (page - 1) * pageSize  pageSize
  let sql = `
  SELECT u.name,u.id as uid,p.id,u.avatar,p.title,p.time,p.brief,p.content 
  FROM posts as p left join users as u 
  on p.uid = u.id 
  where p.status = 0 
  order by p.time desc
  limit ${(page - 1) * pageSize},${pageSize}      
  `;
  db(sql,(err,data)=>{
    if(err) return cb(err,null);
    return cb(err,data);
  })
};

/**
 * 获取总页数
 */
exports.findPostsCount = (cb) => {
  let sql = 'select count(*) as count from posts WHERE status = 0';
  db(sql,(err,results)=>{
    if(err) return cb(err,null);
    return cb(err,results[0].count);
  })
} 

/**
 * 根据id获取文章相关信息 and 作者信息
 */
exports.findPostsInfo = (articleid,callback) => {
  /**
   * 需要的字段有:
   * posts： title content 
   * users:  name company alt homepage avatar
   */
  let sql = 'select p.id,p.uid,p.title,p.content,u.name,u.company,u.alt,u.homepage,u.avatar from posts as p left join users as u on p.uid = u.id where p.id = ?';
  db(sql,[articleid],(err,data) => {
    if(err) return callback(err,null);
    callback(err,data[0]);
  })
}