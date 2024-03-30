export default {
    isInvalidID: (id, res) => {
        if(isNaN(id)) {
            res.status(400);
            res.send({ msg: "id should be a number" })
            return true;
        }
        return false;
    }
}