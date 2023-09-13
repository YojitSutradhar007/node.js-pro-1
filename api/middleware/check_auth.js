const jwtToken =require('jsonwebtoken');

checkAuth=(req,res,next)=>{
    try{
        const tokenVerfiy =jwtToken.verify(req.body.token,"secret");
        console.log(tokenVerfiy);
        if(tokenVerfiy){
            next();

        }else{
            return  res.status(401).send({
                message: 'Invalid Token'
            });
        }
    }catch{
        return  res.status(401).send({
            message: 'Auth Failed third'
        });
    }
}

module.exports={checkAuth};