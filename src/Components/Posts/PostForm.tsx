import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { Widget } from "@uploadcare/react-widget";
import { useFormik } from "formik";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import * as Yup from "yup";
import { UserContext } from "../../Components/UserContext";
import { createPost } from "../../utils/services";
import { Post } from "@prisma/client";
import { useSnackbar } from "notistack";
import * as LR from "@uploadcare/blocks";

LR.registerBlocks(LR);

export default function PostForm({
  slug,
  post,
}: {
  slug: string;
  post?: Post;
}) {
  const { loggedIn } = useContext(UserContext);
  const confirm = useConfirm();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id, userId, createdAt, updatedAt, ...rest } = post || {};

  const formik = useFormik({
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .max(20, "Must be within 20 characters."),
      content: Yup.string()
        .required("Content is required")
        .max(1000, "Must be within 1000 characters."),
      attachment: Yup.string().url().nullable(),
    }),
    initialValues: { title: "", content: "", attachment: null, ...rest },
    onSubmit: async (values, helpers) => {
      const dataToSubmit = {
        ...values,
      };
      try {
        await createPost(slug, dataToSubmit);
        helpers.setSubmitting(false);
        helpers.resetForm();

        router.push("/chan/" + slug);
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

    if (!loggedIn) {
      await confirm({
        title: "Please log in",
        description: "Please log in to submit to the chan.",
        confirmationText: "Log in",
      });
      router.push("/login?redirect_url=" + encodeURIComponent(router.pathname));
      return;
    }

    formik.handleSubmit(event);
  };

  const isDisabled = !loggedIn || formik.isSubmitting;

  return (
    <form onSubmit={handleSubmitWithAuth}>
      <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600 sm:min-w-[500px]">
        <input
          type="text"
          name="title"
          id="title"
          className={`block w-full rounded-sm border-0 p-0 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
            isDisabled ? "cursor-not-allowed" : ""
          }`}
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          disabled={isDisabled}
          {...(formik.errors.title && { "aria-describedby": "title-error" })}
        />
        {formik.errors.title && (
          <div className="pl-2 pt-1 text-xs text-red-500">
            {formik.errors.title}
          </div>
        )}
      </div>
      <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
        <textarea
          name="content"
          id="content"
          className={`block w-full rounded-sm border-0 p-0 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
            isDisabled ? "cursor-not-allowed" : ""
          }`}
          placeholder="Content"
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
      {loggedIn && (
        <div className="mb-[-40px] mt-2">
          <lr-file-uploader-regular
            css-src="https://esm.sh/@uploadcare/blocks@0.22.13/web/file-uploader-regular.min.css"
            ctx-name="my-uploader"
            className="my-config"
            publicKey="298fc65a2986318fd270"
          ></lr-file-uploader-regular>
        </div>
      )}
      <button
        type="submit"
        color="rgb(239, 240, 240)"
        className="w-15 float-right mt-2 h-8 rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6]"
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
