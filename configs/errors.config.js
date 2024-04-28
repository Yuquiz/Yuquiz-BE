export default {
    // Tokens
    "token_missing_or_invalid": {
        code: 401, message: "A valid token needed to access this resource" 
    },
    "token_expired": {
        code: 403, message: "Token has expired, consider logging in again to obtain a new one" 
    },

    // Credentials, authentications, and authorizations
    "username_used": {
        code: 401, message: "Provided username is already used"
    },
    "invalid_credentials": {
        code: 401, message: "Provided credentials is not valid"
    },
    "not_owner": {
        code: 403, message: "You are not the owner of this asset"
    },
    "role_not_authorized": {
        code: 403, message: "You need a higher role to use this endpoint"
    },
    "private_access": {
        code: 403, message: "You don't have permission from the owner of this resource!"
    },

    // Bad requests
    "insufficient_data": {
        code: 400, message: "Provided request doesn't have enough data to be used by server"
    },
    "illegal_request": {
        code: 400, message: "Provided request contains something not accepted by server"
    },

    // Internal errors
    "internal_error": {
        code: 500, message: "Unknown internal server error"
    },
    "query_error": {
        code: 500, message: "An error has occured during server database operation"
    },

    // Unclassified
    "not_found": {
        code: 404, message: "Requested resource doesn't exist in server"
    },
}