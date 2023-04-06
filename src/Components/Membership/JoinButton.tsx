import { Button } from "@mui/material";
import axios from "axios";

export default function JoinButton(){
    const handleClick = ()=>{
        axios.post("/api/checkout/create").then((response)=>{
            window.location.replace(response.data.redirect)

        })
    }
    return <Button onClick={handleClick}>Join Now!</Button>
}