import jwt from 'jsonwebtoken';

export const auth = async(req, res, next)=>{
    console.log('cookies received', req.cookies);
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "You have no token"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            role: decoded.role
        }
        next();        
    } catch (error) {
        console.log("JWT verify error ", error.message);
        return res.status(401).json({message: "Invalid token"});
    }
};