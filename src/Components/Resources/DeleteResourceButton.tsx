import { Button } from "@mui/material";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useConfirm } from "material-ui-confirm";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useState } from "react";

import { AppDispatch } from "../../redux/store";
import { deleteResource } from "../../redux/slices/resource";

export default function DeleteResourceButton({ after = () => { }, id }: { after?: () => void, id: string | number }) {
    const dispatch: AppDispatch = useDispatch()
    const confirm = useConfirm()
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const handleClick = async () => {
        setLoading(true)
        try {
            await confirm({
                title: "Confirm deletion?",
                confirmationText: "Yes, delete",
            })
            await dispatch(deleteResource(id))
            enqueueSnackbar("Deleted successfully", { variant: "success" })
            after()
        } catch (e) {
            if (e)
                confirm({ title: "Couldn't delete resource" })
        } finally {
            setLoading(false)
        }
    }

    return <Button onClick={handleClick}
        sx={{
            backgroundColor: "rgb(239, 239, 239)!important",
            textTransform: "none",
            fontFamily: "Helvetica",
            fontSize: "0.8em",
            borderRadius: "4px",
            color: "#000",
            border: "1px solid #000",
            height: "30px!important",
            margin: "22px 150px 0 0",
            "&:hover ": {
                backgroundColor: "rgb(220, 220, 220) !important;",
            }
        }}
    >
        {!loading && <>Delete</>}
        {loading && <FontAwesomeIcon icon={faSpinner} spin />}
    </Button>
}
