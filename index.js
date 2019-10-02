const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json()); //中间键


const posts = [];
let currentId = 1;
 
app.get('/v1/posts', function (req, res) { 
  ////命名方式 版本号+资源复数
  res.json(posts);
});

//获得与id相匹配的posts的内容
app.get('/v1/posts/:id', (req, res)=>{
 //获取id
  const {id} = req.params;
 //在post数组中找到对应的post
 // google: js find element from array of elements 
  const post = posts.find(i => i.id === Number(id))
  // const post = posts.find(i ==> {
  // (return i.id === id;
  // }) 
  //find 在 posts 这个 array 里面每一项 element
  //i = element
  //搜寻 i 里面那个id 可以匹配
  // ---------------------------
  //处理post找不到的情况
  if (!post){
    return res.sendStatus(404);
  }
  return res.json(post);
})

//向array里添加一个新的post
app.post('/v1/posts', (req, res)=>{
  //获得post里面包含的内容，从body里面获取
  const {author, content} = req.body;
  //赋予id
  const newPost = {author, content, id:currentId++};
  //添加到post里 (add element to array)
  posts.push(newPost);
  //返回添加的内容
  return res.json(newPost);
})

//删除某个特定的post
app.delete('/v1/posts/:id', (req, res)=>{
  //获取id
  const {id} = req.params;

  //通过id找到某个post
  const postIndex = posts.findIndex(i => i.id === Number(id));

  //如果post找不到
  if (postIndex = -1) {
    return res.sendStatus(404);
  }

  //把这个post删除
  const deletePost = posts.splice(postIndex, 1);

  //返回200
  return res.json(deletePost);

})

//更新我们的post
app.put('/v1/posts/:id', (req, res)=>{
  //获取id
  const {id} = req.params;

  //获取post内容
  const {author, content} = req.body;

  //找出这个post
  const post = posts.find(i => i.id === Number(id));

  //处理post找不到
  if (!post){
    return res.sendStatus(404);
  }

  //取代之前的post
  post.author = author;
  post.content = content;

  //返回更新完的
  return res.json(post);
})

app.patch('/v1/posts/:id', (req, res)=>{
  res.send('hello world')
})

const PORT = process.env.PORT;
 
app.listen(PORT, ()=>{
  console.log('server listening on port ${PORT}')
})