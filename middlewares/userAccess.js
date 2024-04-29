export default function userAccess(req, res, next) { 
    const hasPermission = req.role != "user" || req.params.id == req.id // Admin and superadmin bypasses ownership verification
    if(!hasPermission ) return next({
        code: "not_owner", 
        message: "You're not the owner of this resource"
    })

    next();
}