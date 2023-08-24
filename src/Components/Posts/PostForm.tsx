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
  edit = false,
}: {
  slug: string;
  post?: PostResponse;
  edit?: boolean;
}) {
  const { loggedIn } = useContext(UserContext);
  const confirm = useConfirm();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id, userId, createdAt, updatedAt, user, ...rest } = post || {};

  function autoResizeTextarea(event: any) {
    event.target.style.height = "inherit";
    const computed = window.getComputedStyle(event.target);
    const border =
      parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);
    event.target.style.height = `${event.target.scrollHeight + border}px`;
  }

  const MAX_UPLOADS = 10;

  const listener = (e: any) => {
    // console.log(e);
    const attachmentsNew = [...formik.values.attachments];
    if (e.detail.ctx === "post-uploader") {
      for (
        let idx = 0;
        idx < e.detail.data.length && attachmentsNew.length < MAX_UPLOADS;
        idx++
      ) {
        const data = e.detail.data[idx];
        attachmentsNew.push({
          filename: data.name,
          height: data.imageInfo?.height,
          width: data.imageInfo?.width,
          url: data.cdnUrl,
          size: data.size,
          isImage: data.isImage,
          mimeType: data.mimeType,
        });
        // console.log(data);
      }
      formik.setFieldValue("attachments", attachmentsNew);
      const dataOutput = document.querySelector("lr-data-output");
      (dataOutput as any).uploadCollection.clearAll();
    }
  };

  useEffect(() => {
    window.addEventListener("LR_UPLOAD_FINISH", listener);

    return () => {
      window.removeEventListener("LR_UPLOAD_FINISH", listener);
    };
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
  const [message, setMessage] = React.useState("");

  return (
    <>
      <form
        onSubmit={handleSubmitWithAuth}
        onClick={() => setMessage("Form clicked")}
      >
        {message && loggedIn && !edit && (
          <div className="flex w-full justify-center">
            <div className="relative mb-2 items-center gap-x-2 rounded-md px-2.5 py-1.5 font-sans ring-1 ring-inset ring-gray-300 focus-within:z-10">
              <p className="inline-block">Posting to:</p>
              <button
                className={`ml-2 inline-block h-6 w-max cursor-default rounded-md bg-[#272fc756] px-2 font-sans text-sm font-normal text-[#1d205e] hover:opacity-80 sm:h-5 sm:text-xs`}
              >
                {slug}
              </button>
            </div>
          </div>
        )}
        {attachments && attachments?.length > 0 && (
          <div className="flex w-full flex-col items-center">
            <div className="relative mb-2 flex flex-row flex-wrap place-content-center gap-x-2 self-center rounded-md px-3 pb-0.5 pt-3 font-sans ring-1 ring-inset ring-gray-300 focus-within:z-10 mdMobileX:flex-col">
              {attachments.map((attachment, index) => (
                <div className="self-center" key={index}>
                  {attachment.isImage ? (
                    <img
                      className="max-h-[60vh] w-full max-w-[500px] self-center"
                      src={attachment.url}
                    />
                  ) : attachment.mimeType?.startsWith("video") ? (
                    <video
                      className="max-h-[60vh] w-full max-w-[500px]"
                      controls
                      src={attachment.url}
                    />
                  ) : attachment.mimeType?.startsWith("audio") ? (
                    <audio
                      className="w-min-max"
                      controls
                      src={attachment.url}
                    />
                  ) : null}
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
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col" style={{ width: "calc(100vw - 2rem)" }}>
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
              {...(formik.errors.title && {
                "aria-describedby": "title-error",
              })}
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
              onInput={autoResizeTextarea}
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
            {loggedIn && formik.values.attachments?.length < MAX_UPLOADS && (
              <>
                <div className="">
                  <lr-file-uploader-regular
                    css-src="https://esm.sh/@uploadcare/blocks@0.22.13/web/file-uploader-regular.min.css"
                    ctx-name="post-uploader"
                    class="my-config"
                    showEmptyList={true}
                  ></lr-file-uploader-regular>
                  <lr-data-output
                    id="data-output"
                    ctx-name="post-uploader"
                  ></lr-data-output>
                </div>
              </>
            )}
            {formik.values.attachments?.length >= MAX_UPLOADS && (
              <p className="font-sans text-sm text-red-600">
                Upload limit reached
              </p>
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
    </>
  );
}
