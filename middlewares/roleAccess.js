import { PERMISSIONS, ID_RESTRICTED_HANDLERS } from "../configs/rolePermissions.config.js";

export default async function roleAccessController(req, res, next) {
    const endpoint = req.baseUrl.substr(1);
    const methodPermitted = req.role != "user" && PERMISSIONS[req.role][endpoint].includes(req.method);

    if(!methodPermitted) {
        return next({
            code: "not_owner", 
            reason: "You need a higher access role"
        });
    }

    // superadmin bypasses asset ownership verification
    if(req.role != "superadmin" && ["PUT", "DELETE"].includes(req.method)) {
        const ownedResource = await ID_RESTRICTED_HANDLERS[endpoint](req, res, next)
        console.log(ownedResource)
        if(!ownedResource) {
            return next({
                code: "not_owner", 
                reason: "You're not the owner of this resource"
            })
        }
    }

    next();
}