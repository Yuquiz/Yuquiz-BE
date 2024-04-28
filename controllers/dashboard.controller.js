import attempt from "../models/Attempts.js";

export default {
    index: async function (req, res, next) {
        await attempt.quizzesByUser(req.id)
            .then(result => {
                const quizStats = {}
                for(let idx = 0; idx < result.length; idx++) {
                    const item = result[idx];
                    const quizId = item["quiz_id"];
                    if(quizStats[quizId] == null) {
                        quizStats[quizId] = {
                            quizName: `${item["name"]}#${item["quiz_id"]}`,
                            nAttempts: 0,
                            totalScore: 0,
                            bestAttempt: { id: -1, score: -1 }
                        }
                    }

                    quizStats[quizId].nAttempts++
                    quizStats[quizId].totalScore += item["score"]
                    if(quizStats[quizId].bestAttempt.score < item["score"]) {
                        quizStats[quizId].bestAttempt.id = item["id"];
                        quizStats[quizId].bestAttempt.score = item["score"];
                    }
                }

                return res.send({
                    quizzesDone: Object.keys(quizStats).length,
                    quizStats: Object.keys(quizStats)
                            .map(quizId => ({
                                quiz_name: quizStats[quizId].quizName,
                                totalAttempt: quizStats[quizId].nAttempts,
                                average: quizStats[quizId].totalScore / quizStats[quizId].nAttempts,
                                bestAttempt: quizStats[quizId].bestAttempt
                            }))
                });
            }).catch(err => {next(err)})
    }
}