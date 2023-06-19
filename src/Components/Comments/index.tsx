import { Comment } from "@prisma/client";
import { useEffect, useState } from "react";
import { getComments } from "../../utils/services";

export default function Comments({id}: {id: number}){
    const [comments, setComments]  = useState<Comment[]>()

    useEffect(()=>{

        getComments(id).then((data)=>setComments(data))
    }, [id])
    return <>
    <h2>Comments: </h2>
    {comments?.map((comment)=>{
        return <div>
        {comment.content}
        </div>
    })}
    </>

}