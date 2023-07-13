import { useUser } from "@clerk/clerk-react";
import { ButtonProps } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { deletePost } from "../../utils/services";

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
    deletePost("<slug>", postId)
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
        <button
          type="submit"
          className="w-15 relative mb-2 mt-2 h-8 rounded-md bg-red-200 px-2 font-sans text-sm font-normal text-red-500 hover:bg-red-300 hover:text-red-600"
          {...rest}
          onClick={handleClick}
        >
          Delete Post
        </button>
      )}
    </>
  );
}
