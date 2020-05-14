const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res)=>{
    res.json({
        message:'Welcome to the API'
    })
});

app.post('/api/posts',verifyToken,(req,res)=>{

    jwt.verify(req.token,'secretkey',(err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message:'Post Created!!!',
                data:data
            })
        }
    })
    res.json({
        message:'Post Created!!!'
    })
})

app.post('/login',(req,res)=>{
    // Mock user
    const user={
        id:1,
        username:'steve',
        password:'3000'
    }

    jwt.sign({user:user},'secretkey',{expiresIn:'30s'},(err,token)=>{
        res.json({token:token})
    })
})

//Format of token
//Authorization: Bearer <Token>
function verifyToken(req,res,next){

    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined

    if(typeof bearerHeader!='undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        // Get toke from the array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next middleware
        next();
    }else{
        res.sendStatus(403)
    }

}

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`));