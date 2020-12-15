const userRouter = require ('express').Router
const User = require('../models/user')
const bcrypt = require('bcrypt')


userRouter.post('sign-up', async(request,response,next)=>{
    const username =request.body.username
    const passwordHash =bcrypt.hashSync(request.body.password,10)

    if (username && passwordHash){
        const newUser = new User({
            username: username,
            passwordHash: passwordHash
        })

        newUser.save()
        .then((res)=>{
            response.status(200).send({"message":"You Signed Up Succesfully!"})
        })

        .catch((err)=>{
            console.log(err)
            response.status(400).send({"message":"Unable To Save"})

        })

     }  else{
         response.status(400).send({"message":"missing username or password"})
     }


})



userRouter.post('Login', async(request,response,next)=>{
    const username =request.body.username
    const password =request.body.password

    if (username && passwordHash){
        const user = await User.findOne({ username: username})
        if(bcrypt.compareSync(password,user.passwordHash)){
            response.status(200).send("Logged in!")

        }  else{
            response.status(401).send('Incorrect password')
        }
   

     }      else{
        response.status(400).send('No username or password')
    }


})


module.exports = useerRouter