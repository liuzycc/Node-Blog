const express = require('express');
const router = express.Router();
const postsDao = require('../model/postsDao');
const pageSize = 4;
//添加规则

//首页展示
router.get('/',(req,res)=>{
  let page = req.query.page || 1;
  //获取分页数据
  postsDao.findPostPager(page,pageSize,(err,data)=>{
    if(err) res.send('数据查询失败');
    postsDao.findPostsCount((err,count)=>{
      if(err) return res.status(500).send('server error');
      res.render('home/index.html',{
        list:data,
        page,
        count,
        pageCount:Math.ceil(count/pageSize)
      });
    })
  });
})

//文章详情
router.get('/article',(req,res)=>{
  //获取文章id
  let articleID = req.query.articleID;
  //获取当前文章相关数据
  postsDao.findPostsInfo(articleID,(err,data)=>{
    if(err) res.status(500).send('server error');
    console.log(data);
    res.render('home/article.html',{list:data});
  })
})

//作者，文章分页
router.get('/center',(req,res)=>{
  res.render('home/center.html');
})

//登录页展示
router.get('/login',(req,res)=>{
  res.render('home/login.html');
})

//登录操作
router.post('/login',(req,res)=>{
  res.send('loginccc');
})

//注册页面
router.get('/register',(req,res)=>{
  res.render('home/register.html');
})

//注册操作
router.post('/register',(req,res)=>{
  res.send('registerccc');
})

//关于我们的页面
router.get('/about',(req,res)=>{
  res.render('home/about.html');
})

//加入我们
router.get('/join',(req,res)=>{
  res.render('home/join.html');
})



module.exports = router;
