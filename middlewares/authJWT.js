export default function authJWT(req, res, next) {
    console.log("Your token: " + req.headers.authorization);
    next();
}