export default {
    "username_used": {
        code: 401, message: "Provided username is already used"
    },
    "invalid_credentials": {
        code: 401, message: "Provided credentials is not valid"
    },
    "insufficient_data": {
        code: 400, message: "Provided request doesn't have enough data to be used by server"
    },
    "illegal_request": {
        code: 400, message: "Provided request contains something not accepted by server"
    },
    "internal_error": {
        code: 500, message: "Unknown internal server error"
    },
    "not_found": {
        code: 404, message: "Requested resource doesn't exist in server"
    },
    "query_error": {
        code: 500, message: "An error has occured during server database operation"
    },
    "token_missing_or_invalid": {
        code: 403, message: "A valid token needed to access this resource" 
    },
    "token_expired": {
        code: 403, message: "Token has expired, consider logging in again to obtain a new one" 
    },
    "unknown": {
        code: 500, message: "Unknown internal server error"
    },
}