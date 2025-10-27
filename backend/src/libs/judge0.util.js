import axios from 'axios'

export const getAllLanguages = (language) => {
    const LanguageMap = {
        "JavaScript": 63,
        "Python": 71,
        "Java": 62,
    }

    return LanguageMap[language];
}


export const submitBatch = async (submissions) => {
    const JUDGE0_API_URL = process.env.JUDGE0_API_URL
    const {data} = await axios.post(`${JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {
        submissions: submissions,
    })  

    return data;   
}

export const poolBathResults = async (tokens) => {
    while(true) {
        const JUDGE0_API_URL = process.env.JUDGE0_API_URL
        const {data} = await axios.get(`${JUDGE0_API_URL}/submissions/batch`, {
            params: {
                tokens: tokens.join(','),   
                base64_encoded: false,
            }
        })

        const results = data.submissions;

        const isAllCompleted = results.every((result) => result.status.id >= 3)

        if(isAllCompleted) {
            return results;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000))
    }
}

export const getLanguageById = (language_id) => {
    const LanguageMap = {
        63: "JavaScript",
        71: "Python",
        62: "Java",
    }

    return LanguageMap[language_id];
}