import { useUser } from "@clerk/nextjs";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import * as Yup from "yup";
import { createComment } from "../../utils/services";
import { UserContext } from "../UserContext";

export default function CommentForm({
  id,
  onComplete = () => {},
}: {
  id: number;
  onComplete: () => void;
}) {
  const router = useRouter();
  const { user } = useUser();
  const { loggedIn } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    validationSchema: Yup.object({
      content: Yup.string().required("Content is required"),
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

  return (
    <form onSubmit={formik.handleSubmit}>
      {user?.profileImageUrl && (
        <img
          src={user.profileImageUrl}
          alt="Your profile photo"
          className="relative mb-[-35px] h-6 w-6 flex-none rounded-full bg-gray-50"
        />
      )}
      <div className="relative ml-10 mt-[11px] rounded-md px-3 pb-3 pt-3 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
        <textarea
          name="content"
          id="content"
          className={`block w-full rounded-sm border-0 p-0 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
            formik.isSubmitting ? "cursor-not-allowed" : ""
          }`}
          placeholder="Content"
          value={formik.values.content ?? ""}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
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
      <div className="mb-[-32px] ml-10 mt-2">
        <lr-file-uploader-regular
          css-src="https://esm.sh/@uploadcare/blocks@0.22.13/web/file-uploader-regular.min.css"
          ctx-name="my-uploader"
          className="my-config"
          publicKey="298fc65a2986318fd270"
        ></lr-file-uploader-regular>
      </div>
      <button
        type="submit"
        color="rgb(239, 240, 240)"
        className="w-15 float-right mb-2 h-8 rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6]"
      >
        {!formik.isSubmitting && <>Save</>}
        {formik.isSubmitting && (
          <span>
            <FontAwesomeIcon icon={faSpinner} spin />
          </span>
        )}
      </button>
    </form>
  );
}
