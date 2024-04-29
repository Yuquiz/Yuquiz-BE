import { PERMISSIONS } from "../configs/rolePermissions.config.js";

export default async function roleAccessController(req, res, next) {
    const endpoint = req.baseUrl.substr(1);
    const methodProhibited = (
        !(PERMISSIONS[req.role][endpoint].includes(req.method))
        || (req.method == "GET" && req.params.id == undefined && req.role == "user") // handles user tries to get all
    );

    if(methodProhibited) {
        return next({
            code: "role_not_authorized", 
            message: "You need a higher access role"
        });
    }

    // // superadmin bypasses asset ownership verification
    // if(req.role != "superadmin" && ["GET", "PUT", "DELETE"].includes(req.method)) {
    //     const ownedResource = await IS_OWN_HANDLERS[endpoint](req, res, next)
    //     if(!ownedResource) {
    //         return next({
    //             code: "not_owner", 
    //             message: "You're not the owner of this resource"
    //         })
    //     }
    // }

    next();
}