import jwt from 'jsonwebtoken'

export const adminAuth = async (req,res,next) => {
    try {
        const {token} = req.headers
        if (!token) {
            return res.json({
                success : false,
                message : 'Not authorized'
            })
        }
        const token_decode = jwt.verify(token,process.env.JWTS)
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                success : false,
                message : "Not authorized"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            success : false,
            message : error.message
        })
    }
}