const express = require('express');
const { title } = require('process');
const Post = require('../models/post');
const router = express.Router();

//all query functionality is contained here



//everything here returns a .json
router.use(express.json());

//print all
router.get('/', async (req, res) => {
    try {
      const post = await Post.find()
      res.json(post)
      
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

//print by name
router.get('/:id', getPost, (req, res) => {
    res.json(res.post)
})
  

//add new
router.post('/', async (req, res) => {
    console.log(req.body);
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date
    })
    try {
      const newPost = await post.save()
      res.status(201).json(newPost)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

//remove
router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        await Post.find({title : req.params.id}).remove()
        res.json({ message: 'Deleted' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
  })

// updating
router.patch('/:id', async (req, res) => {

    try{
        //find post by name
        const post = await Post.find({title : req.params.id})

        //todo: change this monstrosity
        //works for now ¯\_(ツ)_/¯
        await Post.find({title : req.params.id}).updateOne(req.post, { $set: {title: req.body.title, description: req.body.description, date: req.body.date }, async function(err, res){
            
            try {
                await post.save()
            } catch (err) {
              res.status(400).json({ message: err.message })
            }
        }})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    
  })
async function getPost(req, res, next){
    console.log(req.params.id);
    try{
        //find post by name
        post = await Post.find({title : req.params.id})
        if (post == null){
            return res.status(404).json({message:'Cant find post'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    //return post
    res.post = post
    next()
  }





  
module.exports = router;