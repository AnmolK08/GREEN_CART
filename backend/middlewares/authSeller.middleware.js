import jwt from 'jsonwebtoken';
const authSeller = (req ,res , next)=>{
    const { sellerToken } = req.cookies;

    if(!sellerToken){
        return res.json({
            sucess : false,
            message : 'Not Authorized'
        })
    }
    try {
        const decodeToken = jwt.verify(sellerToken , process.env.JWT_SECRET);
        if(decodeToken.email === process.env.SELLER_EMAIL){
            next();
        }
        else{
            return res.json({
                sucess : false,
                message : 'Not Authorized'
            }) 
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({
            sucess : false,
            message : error.message
        })
    }
}

export default authSeller;