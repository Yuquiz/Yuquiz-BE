export default function authJWT(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer: ", "");
    
    if(token === undefined) {
        return res.status(401).send({msg: "No token provided in request"});
    }

    console.log("Your token: " + req.headers.authorization);
    next();
}