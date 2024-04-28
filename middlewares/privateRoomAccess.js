import roomPermission from "../models/RoomPermissions.js";
import room from "../models/PrivateRooms.js";
import {PERMISSIONS} from "../configs/roomPermissions.config.js"

export default async function(req, res, next) {
    const ENDPOINT = "room";
    let error = null;
    let hasPermission = req.role == "superadmin"; // Superadmin bypasses all ownership verification

    if(!hasPermission) { 
        await room.getById(req.params.id) // Is current user the owner of this room?
            .then(result => hasPermission = req.id == result?.user_id)    
            .catch(err => error = err )
    }

    if(!hasPermission) { 
        await roomPermission.roomByUserId(req.id) // Does the current user has permission to this room?
            .then(result => {
                let ptr = 0;
                while(ptr < result.length && !hasPermission) {
                    hasPermission = req.params.id == result[ptr].room_id;
                    ptr++
                }
            })
            .catch(err => error = err )

        if(hasPermission) { // Does the method allowed for current user? (owner bypasses this)
            hasPermission = hasPermission && (
                PERMISSIONS["participant"][ENDPOINT].includes(req.method)
            )
        }
    }

    if(error != null) return next(error)
    if(!hasPermission) {
        return next( {
            code: "no_private_access", 
            message: "You don't have permission to this room!"
        })
    }

    next();
}