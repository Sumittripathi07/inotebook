const jwt = require('jsonwebtoken');

let JWT_SECRET = 'IAmAGoodBoy';

const fetchuser =(req,res,next)=>{
    // Get the user from the JWT token and add id to req Object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error:"Please authenticate using valid Token"})
        
    }
    try {
        const data= jwt.verify(token,JWT_SECRET);
        req.user= data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error:"Please authenticate using valid Token"})
        
    }
}
module.exports= fetchuser;