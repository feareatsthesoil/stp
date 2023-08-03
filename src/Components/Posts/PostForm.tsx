import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as LR from "@uploadcare/blocks";
import { useFormik } from "formik";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
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

  const [uploadDetails, setUploadDetails] = useState<{
    filename: string;
    size: string;
    height: string;
    width: string;
    url: string;
  }>();

  const MAX_UPLOADS = 10;
  const listener = (e: any) => {
    console.log(e);
    const attachmentsNew = [...formik.values.attachments];
    if (e.detail.ctx === "post-uploader") {
      const idx = e.detail.data.length - 1;
      const data = e.detail.data[idx];
      attachmentsNew.push({
        filename: data.name,
        height: data.imageInfo.height,
        width: data.imageInfo.width,
        url: data.cdnUrl,
        size: data.size,
      });

      formik.setFieldValue("attachments", attachmentsNew);
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
        .max(25000, "Must be within 25,000 characters."),
      attachments: Yup.array().of(Yup.object()),
    }),
    initialValues: {
      title: "",
      content: "",
      attachments: [],
      anon: false,
      ...rest,
    },
    onSubmit: async (values, helpers) => {
      const dataToSubmit = {
        ...values,
        uploadDetails: uploadDetails,
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
      router.push("/login?redirect_url=" + encodeURIComponent(router.pathname));
      return;
    }

    formik.handleSubmit(event);
  };

  const isDisabled = !loggedIn || formik.isSubmitting;
  const attachments = formik.values.attachments;

  return (
    <form onSubmit={handleSubmitWithAuth}>
      <div className="flex flex-col" style={{ width: "calc(100vw - 2rem)" }}>
        {attachments &&
          attachments.map((attachment, index) => {
            return (
              <>
                <div className="self-center">
                  <img
                    className="b-2 w-full max-w-[500px] self-center"
                    src={attachment.url}
                  />
                  <button
                    type="submit"
                    className="w-15 relative mb-2 mt-2 h-8 rounded-md bg-red-200 px-2 font-sans text-sm font-normal text-red-500 hover:bg-red-300 hover:text-red-600"
                    onClick={() => {
                      formik.setFieldValue("attachments", [
                        ...(formik.values.attachments as any[]).slice(0, index),
                        ...(formik.values.attachments as any[]).slice(
                          index + 1
                        ),
                      ]);
                    }}
                  >
                    Delete Image
                  </button>
                </div>
              </>
            );
          })}
        <div className="relative w-full max-w-[500px] self-center rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 font-sans ring-1 ring-inset ring-gray-300 focus-within:z-10">
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

        <div className="relative w-full max-w-[500px] self-center rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 font-sans ring-1 ring-inset ring-gray-300 focus-within:z-10">
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
          <div className="ml-auto mr-2 mt-1 flex h-6 items-center">
            <input
              id="anon"
              name="anon"
              type="checkbox"
              className="h-4 w-4 rounded text-indigo-600 ring-red-300 hover:cursor-pointer focus:ring-indigo-600"
              disabled={loggedIn ? false : true}
              checked={formik.values.anon || false}
              onChange={(e) => {
                formik.setFieldValue("anon", e.target.checked);
              }}
            />

            <div className="ml-1 text-sm leading-6">
              <label
                htmlFor="comments"
                className="font-sans text-xs font-medium text-[#767676]"
              >
                Anonymous
              </label>
            </div>
          </div>
        </div>
        <div className="my-2 flex w-full max-w-[500px] justify-between self-center">
          {loggedIn && formik.values.attachments?.length < 4 && (
            <>
              <div className="">
                <lr-file-uploader-regular
                  css-src="https://esm.sh/@uploadcare/blocks@0.22.13/web/file-uploader-regular.min.css"
                  ctx-name="post-uploader"
                  class="my-config"
                ></lr-file-uploader-regular>
              </div>
            </>
          )}
          {formik.values.attachments?.length >= MAX_UPLOADS && (
            <>Limit reached</>
          )}
          <div className="my-config"></div>
          <button
            type="submit"
            color="rgb(239, 240, 240)"
            className="w-15 float-right h-8 rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6]"
          >
            {!formik.isSubmitting &&
            loggedIn &&
            router.pathname.endsWith("/edit") ? (
              <>Save</>
            ) : loggedIn ? (
              !formik.isSubmitting ? (
                <>Post</>
              ) : (
                <FontAwesomeIcon icon={faSpinner} spin />
              )
            ) : (
              <>Log In / Sign Up</>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
