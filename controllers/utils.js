export default {
    isInvalidID: (id, res) => {
        if(isNaN(id)) {
            res.status(400);
            res.send({ msg: "id should be a number" })
            return true;
        }
        return false;
    },

    isBodyEmpty: (body, res) => {
        if(Object.keys(body).length == 0) {
            res.status(400);
            res.send({ msg: "no data passed for this endpoint to work on" })
            return true;
        }
        return false;
    },

    hasUnexpectedKey: (bodyKeys, fillableKeys, res) => {
        const isAllKeyValid = bodyKeys.reduce((stillValid, key) => (
                                stillValid && fillableKeys.includes(key)
                            ), true)
        if(!isAllKeyValid) {
            res.status(400);
            res.send({msg: `this endpoint only expects [${fillableKeys.join(", ")}]`});
            return true;
        }
        return false;
    }
}