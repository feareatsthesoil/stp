import { Button, ButtonProps } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { deleteComment } from "../../utils/services";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";

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
        <button
          type="submit"
          color="rgb(239, 240, 240)"
          className="w-15 ml-1 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
          onClick={handleClick}
        >
          Delete
        </button>
      )}
    </>
  );
}
