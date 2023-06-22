import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteResource } from "../../redux/slices/resource";
import { AppDispatch } from "../../redux/store";

export default function DeleteResourceButton({
  after = () => {},
  id,
}: {
  after?: () => void;
  id: string | number;
}) {
  const dispatch: AppDispatch = useDispatch();
  const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      await confirm({
        title: "Confirm deletion?",
        confirmationText: "Yes, delete",
      });
      await dispatch(deleteResource(id));
      enqueueSnackbar("Deleted successfully", { variant: "success" });
      after();
    } catch (e) {
      if (e) confirm({ title: "Couldn't delete resource" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      sx={{
        float: "right",
        backgroundColor: "rgb(239, 239, 239)",
        textTransform: "none",
        fontFamily: "Helvetica",
        fontSize: ".9em",
        borderRadius: "4px",
        color: "#000",
        border: "1px solid #000",
        height: "30px",
        margin: "27px 180px 20px 0",
        "&:hover ": {
          backgroundColor: "rgb(220, 220, 220) !important;",
        },
      }}
      color="secondary"
      variant="contained"
    >
      {!loading && <>Delete</>}
      {loading && <FontAwesomeIcon icon={faSpinner} spin />}
    </Button>
  );
}
