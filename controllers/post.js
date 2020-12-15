const postRouter = require ('express').Router
const { response } = require('express')
const Post = require('../models/post')

postRouter.length('/',(request,response,next)=>{
    Post.find({}).then((res)=>{
        response.status(200).send(res)
        next()
    })
})


postRouter.length('/:author',(request,response,next)=>{
    const author = request.params.author
    Post.find({author:author}).then ((res)=>{
        response.status(200).send(res)
        next()
    })
})


postRouter.get('/',(request, response, next)=>{
    
})



postRouter.post('/',async(request, response, next)=>{
    const {title, content, author, date}= request.body

    if (title && content && author && date){
        const postCount= await Post.countDocuments()
        const newPost = new Post({
            id: postCount +1,
            title: title,
            content: content,
            author: author,
            date: date,
            upvotes: 0,
            downvotes: 0
        })
            newPost.save()
                .then(res =>{
                  response.status(201).send({message:'succesfully added!'})
                })
            .catch(err => {
                console.log(err)
            })
    }  else{
        response.status(400).send({message:'Missing some fields'})
    }
})


postRouter.put('/:id',(request,response,next)=>{
          
})