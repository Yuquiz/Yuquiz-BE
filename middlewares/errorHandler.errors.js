export default {
    "auth_reject": {
        code: 401,
        message: "Provided credentials is not valid"
    },
    "bad_request": {
        code: 400,
        message: "Your request contains something not accepted by server"
    },
    "not_found": {
        code: 404,
        message: "Requested resource doesn't exist in server"
    },
    "sql_error": {
        code: 500,
        message: "An error has occured during server database operation"
    },
    "token_missing_or_invalid": {
        code: 403,
        message: "You need a valid token to access this resource" 
    },
    "token_expired": {
        code: 403,
        message: "Your token has expired, consider logging in again to obtain a new one" 
    },
}