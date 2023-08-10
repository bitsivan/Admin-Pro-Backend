const {response}=require('express');
const jwt=require('jsonwebtoken');

const validateJWT = (req, res=response, next) => {
    //read token
    const token = req.header('x-token');
    //console.log(token);

    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'Dont exist token.'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        console.log(uid);
        req.uid= uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token.'
        })
    }

};

module.exports = {
  validateJWT,
};
