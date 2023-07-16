import axios from 'axios'
export function moderate(text: string){
    return axios.post("https://api.openai.com/v1/moderations", {input: text}, {headers: {"Authorization": `Bearer ${process.env.OPEN_API_KEY}`}} ).then(response=>{
       
        return response.data.results[0]
       
    }).catch((err=>{
        console.error(err.response?.data)
    }))

    
}