import user from "../models/Users.js";

export default {
    index: async function(req, res, next) {
        await user.getById(req.id)
            .then(result => res.send({
                    msg: `Hello, ${result["name"]} (U#${result["id"]})`,
                    info: result,
                }
            )).catch(err => next(err))
    }
}