const Todo = require('../models/Todo')
const Destination = require("../models/Destination")

/*
when you create a to do will be under the logged in user id
with the id you know what documents to grab
*/ 
module.exports = {
    getTodos: async (req,res)=>{
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})      
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    // create a new destination
    createDestination: async (req, res) => {
        try{
          await Destination.create({title: req.body.titleDestination})
          console.log('Destination added!')
          res.redirect('/todos')
        } catch (err){
          console.log(err);
        }
      },
      // get the new created destination
      getDestination: async (req,res)=>{
        try{
            const newDestination = await Destination.find({title:''})
            res.render('todos.ejs', {titles: newDestination})
        }catch(err){
            console.log(err)
        }
    }, 

}    

/*
getDestination: async (req, res)=>{
        try{
            Destination.find({}, (err, destinations) => {
                res.render('todos.ejs', {titles: destinations})
                console.log(titles)
            })  
        }catch(err){
            console.log(err)
        }
    }, 
 */