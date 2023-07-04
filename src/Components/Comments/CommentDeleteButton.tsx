import { Button, ButtonProps } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { deleteComment } from "../../utils/services";
import { useUser } from "@clerk/clerk-react";

export default function CommentDeleteButton(
  props: Omit<ButtonProps, "onClick"> & {
    onComplete?: () => void;
    commentId: number;
    postId: number;
  }
) {
  const { onComplete, postId, commentId, ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const { user } = useUser();

  const handleClick = () => {
    deleteComment(postId, commentId)
      .then(() => {
        console.log("Completing onComplete action");
        onComplete && onComplete();
        enqueueSnackbar({ message: "Deleted comment!", variant: "success" });
      })
      .catch(() => {
        confirm({ title: "Couldn't Delete Comment", hideCancelButton: true });
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
