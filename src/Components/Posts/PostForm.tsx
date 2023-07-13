import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as LR from "@uploadcare/blocks";
import { useFormik } from "formik";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import { UserContext } from "../../Components/UserContext";
import { PostResponse } from "../../types";
import { createPost, editPost } from "../../utils/services";

LR.registerBlocks(LR);

export default function PostForm({
  slug,
  post,
}: {
  slug: string;
  post?: PostResponse;
}) {
  const { loggedIn } = useContext(UserContext);
  const confirm = useConfirm();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id, userId, createdAt, updatedAt, user, ...rest } = post || {};

  const listener = (e: any) => {
    if (e.detail.ctx === "post-uploader") {
      const idx = e.detail.data.length - 1;
      console.log("URL", e.detail.data[idx].cdnUrl);
      formik.setFieldValue("attachment", e.detail.data[idx].cdnUrl);
    }
  };
  useEffect(() => {
    window.addEventListener("LR_UPLOAD_FINISH", listener);
    return () => window.removeEventListener("LR_UPLOAD_FINISH", listener);
  }, [listener]);

  const formik = useFormik({
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .max(100, "Must be within 100 characters."),
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
        await (!post?.id
          ? createPost(slug, dataToSubmit)
          : editPost(slug, post.id, dataToSubmit));
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
  const attachment = formik.values.attachment;

  return (
    <form onSubmit={handleSubmitWithAuth}>
      <div className="flex flex-col">
        {attachment && (
          <>
            <div className="m self-center">
              <img
                className="b-2 w-full max-w-[500px] self-center"
                src={attachment}
              />
              <button
                type="submit"
                className="w-15 relative mb-2 mt-2 h-8 rounded-md bg-red-200 px-2 font-sans text-sm font-normal text-red-500 hover:bg-red-300 hover:text-red-600"
                onClick={() => formik.setFieldValue("attachment", null)}
              >
                Delete Image
              </button>
            </div>
          </>
        )}
        <div className="relative w-full min-w-[500px] max-w-[500px] self-center rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 font-sans ring-1 ring-inset ring-gray-300 focus-within:z-10">
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

        <div className="relative w-full max-w-[500px] self-center rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 font-sans ring-1 ring-inset ring-gray-300 focus-within:z-10 ">
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
        <div className="w-full max-w-[500px] self-center">
          {loggedIn && (
            <div className="mb-[-40px] mt-2">
              <lr-file-uploader-regular
                css-src="https://esm.sh/@uploadcare/blocks@0.22.13/web/file-uploader-regular.min.css"
                ctx-name="post-uploader"
                class="my-config"
              ></lr-file-uploader-regular>
            </div>
          )}

          <div className="my-config"></div>
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
        </div>
      </div>
    </form>
  );
}
