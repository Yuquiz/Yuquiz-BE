import model from "../models/Attempts.js";

function generateTop10(result) {
    const bestRecords = new Array(10).fill(null);

    let filledEntries = 0;
    let ptr = 0;
    while(ptr < result.length) {
        const currentRecord = result[ptr]

        // Search for appropiate position
        // Guarantees no worse record belongs to same user (if any) would be encountered
        let replacePtr = -1;
        let positionSearchDone = false;
        let hasBetterDuplicate = false;
        while(!positionSearchDone) {
            replacePtr++;
            const currentExistingRecord = bestRecords[replacePtr];

            hasBetterDuplicate = (
                currentExistingRecord != null 
                && currentExistingRecord.user_id == currentRecord.user_id
                && currentExistingRecord.score > currentRecord.score
            );

            positionSearchDone = (
                replacePtr < filledEntries
                || currentExistingRecord == null 
                || hasBetterDuplicate
                || currentExistingRecord.score < currentRecord.score
                || (
                    currentExistingRecord.score == currentRecord.score // Attempt with lower id means an attempt recorded earlier.
                    && currentExistingRecord.id > currentRecord.id // This has to be done since SQL join groups record by id, which a column the join based on
                    )    
            );
        }

        if(!hasBetterDuplicate) {
            let updateUpperBound = filledEntries;
            let newEntryExist = filledEntries < 10;

            // Search for worse record
            let tempPtr = replacePtr;
            while(tempPtr < filledEntries) {
                const currentExistingRecord = bestRecords[tempPtr];
                const currentIsWorseDuplicate = (
                    currentExistingRecord.user_id == currentRecord.user_id
                    && currentRecord.score > currentExistingRecord.score
                );
                
                if(currentIsWorseDuplicate) { 
                    updateUpperBound = tempPtr + 1; 
                    newEntryExist = false;
                }
                tempPtr++
            }

            if(newEntryExist) filledEntries++;

            // Rearrange bestRecords
            tempPtr = replacePtr;
            while(tempPtr < updateUpperBound) {
                bestRecords[updateUpperBound] = bestRecords[updateUpperBound - 1]
                updateUpperBound--;
            }
            bestRecords[replacePtr] = currentRecord;
        }

        ptr++;
    }

    return bestRecords.slice(0, filledEntries);
}

export default {
    index: async function(req, res, next) {
        await model.users(req.params.id)
            .then(result => {
                return res.send({
                    msg: "Best attempt fetch success",
                    data: generateTop10(result)
                })
            })
            .catch(err => next(err));
    },
}