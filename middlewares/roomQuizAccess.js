import roomQuiz from "../models/RoomQuizzes.js";
import roomPermission from "../models/RoomPermissions.js";
import room from "../models/PrivateRooms.js";
import {PERMISSIONS} from "../configs/roomPermissions.config.js"

// TODO: Complete it
export default async function(req, res, next) {
    const ENDPOINT = "roomQuiz";
    let error = null;
    let hasPermission = req.role != "user"; // Superadmin and admin bypasses ownership verification

    const roomId = await roomQuiz.getById(req.params.id)
        .then(result => result?.room_id)
        .catch(err => error = err)

    if(!hasPermission) {
        await room.getById(roomId) // Is current user the owner of this room?
            .then(result => hasPermission = req.id == result?.user_id)    
            .catch(err => error = err )
    }

    if(!hasPermission) { 
        await roomPermission.usersByRoomId(roomId) // Does current user has permission to this room?
            .then(result => {
                let ptr = 0;
                while(ptr < result.length && !hasPermission) {
                    hasPermission = req.id == result[ptr].participant_id;
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
            message: "You don't have permission to this room to access this roomQuiz!"
        })
    }

    next();
}