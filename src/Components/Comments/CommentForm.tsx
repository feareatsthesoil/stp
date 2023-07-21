import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as LR from "@uploadcare/blocks";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import * as Yup from "yup";
import { createComment } from "../../utils/services";
import { UserContext } from "../../Components/UserContext";

LR.registerBlocks(LR);

export default function CommentForm({
  id,
  onComplete = () => {},
}: {
  id: number;
  onComplete: () => void;
}) {
  const { user } = useUser();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { loggedIn } = useContext(UserContext);

  const formik = useFormik({
    validationSchema: Yup.object({
      content: Yup.string()
        .required("Content is required")
        .max(1000, "Must be within 1000 characters."),
    }),
    initialValues: { content: "" },
    onSubmit: async (values, helpers) => {
      const dataToSubmit = { ...values };
      try {
        await createComment(id, dataToSubmit);
        helpers.setSubmitting(false);
        helpers.resetForm();
        onComplete();
      } catch (ex: any) {
        enqueueSnackbar({
          variant: "error",
          message: ex.response?.data?.message || "Something went wrong",
        });
      }
    },
  });

  const handleSubmitWithAuth = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!user) {
      router.push("/login?redirect_url=" + encodeURIComponent(router.pathname));
      return;
    }

    formik.handleSubmit(event);
  };

  const isDisabled = !user || formik.isSubmitting;

  return (
    <form onSubmit={handleSubmitWithAuth}>
      <div className="relative flex max-w-[500px]">
        <div className="absolute left-0 top-0 flex h-6 w-6 translate-y-[-8px] justify-center">
          <div className="w-px bg-slate-200" />
        </div>
        <img
          src={user?.profileImageUrl || "/favicon.ico"}
          alt="Your profile photo"
          className="relative mt-2 h-6 w-6 flex-none rounded-full bg-gray-50"
        />
        <div className="relative ml-[17px] w-full rounded-md px-3 pb-3 pt-3 ring-1 ring-inset ring-gray-300 focus-within:z-10  ">
          <textarea
            name="content"
            id="content"
            className={`block w-full h-auto rounded-sm border-0 p-0 pl-2 pt-1 font-sans text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
              isDisabled ? "cursor-not-allowed" : ""
            }`}
            placeholder="Comment"
            value={formik.values.content ?? ""}
            onChange={formik.handleChange}
            disabled={isDisabled}
            {...(formik.errors.content && {
              "aria-describedby": "content-error",
            })}
          />
          {formik.errors.content && (
            <div className="pl-2 pt-1 text-xs text-red-500">
              {formik.errors.content}
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 flex max-w-[500px] justify-end">
        <button
          type="submit"
          color="rgb(239, 240, 240)"
          className="w-15 h-8 rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6]"
        >
          {!loggedIn && <>Log In / Sign Up</>}
          {!formik.isSubmitting && loggedIn && <>Reply</>}
          {formik.isSubmitting && (
            <span>
              <FontAwesomeIcon icon={faSpinner} spin />
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
