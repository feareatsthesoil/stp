import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteDirectory } from "../../redux/slices/directory";
import { AppDispatch } from "../../redux/store";

export default function DeleteButton({ after = () => { }, id }: { after?: () => void, id: string | number }) {
    const dispatch: AppDispatch = useDispatch()
    const confirm = useConfirm()
    const [loading, setLoading] = useState(false)
    const handleClick = async () => {
        setLoading(true)
        try {
            await dispatch(deleteDirectory(id))
            after()
        } catch {
            confirm({ title: "Couldn't delete resource" })
        } finally {
            setLoading(false)
        }
    }

    return <Button onClick={handleClick}
        sx={{
            backgroundColor: "rgb(239, 239, 239)",
            textTransform: "none",
            fontFamily: "Times New Roman",
            borderRadius: "0",
            color: "#000",
            border: "1px solid #000",
            height: "30px",
            margin: "60px 0 0 0",
            "&:hover ": {
                backgroundColor: "rgb(199, 199, 199)",
            }
        }}
    >Delete {loading && <FontAwesomeIcon icon={faSpinner} spin />}</Button>
}
