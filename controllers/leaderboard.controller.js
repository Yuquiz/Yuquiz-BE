import model from "../models/Attempts.js";

export default {
    index: async function(req, res, next) {
        await model.users(req.params.id)
            .then(result => {
                const top10 = Array.from(result).slice(0, 10);
                let tempScores = top10.map((val, idx) => [idx, val["score"]])
                                    .sort((thatElem, thisElem) => thisElem[1] - thatElem[1] );

                return res.send({
                    msg: "Best attempt fetch success",
                    data: tempScores.map(val => top10[val[0]])
                })
            })
            .catch(err => next(err));
    },
}