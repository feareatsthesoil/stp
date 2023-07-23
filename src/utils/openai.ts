import axios from 'axios'
export function moderate(text: string){
    return axios.post("https://api.openai.com/v1/moderations", {input: text}, {headers: {"Authorization": `Bearer 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`}} ).then(response=>{
       
        return response.data.results[0]
       
    }).catch((err=>{
        console.error(err.response?.data)
    }))

    
}