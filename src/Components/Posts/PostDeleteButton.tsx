import { Button, ButtonProps } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { deletePost } from "../../utils/services";
import { useUser } from "@clerk/clerk-react";

export default function PostDeleteButton(
  props: Omit<ButtonProps, "onClick"> & {
    onComplete?: () => void;
    postId: number;
  }
) {
  const { onComplete, postId, ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const { user } = useUser();

  const handleClick = () => {
    deletePost("<slug>", postId) // Replace <slug> with the appropriate board slug
      .then(() => {
        console.log("Completing onComplete action");
        onComplete && onComplete();
        enqueueSnackbar({ message: "Deleted post!", variant: "success" });
      })
      .catch(() => {
        confirm({ title: "Couldn't Delete Post", hideCancelButton: true });
      });
  };

  return (
    <>
      {user && (
        <Button color="error" {...rest} onClick={handleClick}>
          Delete
        </Button>
      )}
    </>
  );
}
