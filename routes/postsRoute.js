const express = require("express")
const postRouter = express.Router()

const {ObjectId} = require("mongodb")

//importing mongodb
const mongo = require("../shared/mongo")

//importing service

const postsService = require("../services/postsService")

postRouter.get("/",async(req,res) => {
    const posts = await postsService.getPosts()
    res.send(posts);
})

postRouter.get("/:id",async(req,res) => {
    const posts = await postsService.getPost(req.params.id)
    res.send(posts);
})

postRouter.post("/",async(req,res) => {
    const post = await postsService.addPosts(req.body);
    res.send(post)
})

postRouter.put("/:id",async(req,res) => {
    const post = await postsService.updatePosts(req.params.id,req.body) ;
    res.send(post)
})

postRouter.delete("/:id",async(req,res) => {
    await postsService.deletePost(req.params.id);
    res.send({});
})


module.exports = postRouter; 