import { useUser } from "@clerk/nextjs";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import { UserContext } from "../../Components/UserContext";
import { createComment } from "../../utils/services";
import * as LR from "@uploadcare/blocks";

LR.registerBlocks(LR);

export default function CommentForm({
  id,
  onComplete,
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
        .max(10000, "Must be within 10,000 characters."),
      attachments: Yup.array().of(Yup.object()),
    }),
    initialValues: { content: "", anon: false, attachments: [] as any[] },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await createComment(id, values);
        setSubmitting(false);
        resetForm();
        onComplete();
      } catch (ex: any) {
        enqueueSnackbar({
          variant: "error",
          message: ex.response?.data?.message || "Something went wrong",
        });
      }
    },
  });

  const MAX_UPLOADS = 10;
  const { attachments } = formik.values;
  const listener = (e: any) => {
    console.log(e);
    const attachmentsNew = [...formik.values.attachments];
    if (e.detail.ctx === "comment-uploader") {
      for (
        let idx = 0;
        idx < e.detail.data.length && attachmentsNew.length < MAX_UPLOADS;
        idx++
      ) {
        const data = e.detail.data[idx];
        attachmentsNew.push({
          filename: data.name,
          height: data.imageInfo.height,
          width: data.imageInfo.width,
          url: data.cdnUrl,
          size: data.size,
        });
      }

      formik.setFieldValue("attachments", attachmentsNew);
      const dataOutput = document.querySelector("lr-data-output");
      (dataOutput as any).uploadCollection.clearAll();
    }
  };
  useEffect(() => {
    window.addEventListener("LR_UPLOAD_FINISH", listener);
    return () => window.removeEventListener("LR_UPLOAD_FINISH", listener);
  }, [listener]);

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
    <>
      <form onSubmit={handleSubmitWithAuth}>
        <div className="relative flex max-w-[500px]">
          <div className="absolute left-0 top-0 flex h-6 w-6 translate-y-[-8px] justify-center">
            <div className="w-px bg-slate-200" />
          </div>
          <img
            src={
              formik.values.anon
                ? "/favicon.ico"
                : user?.profileImageUrl || "/favicon.ico"
            }
            alt="Your profile photo"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = "/favicon.ico";
            }}
            className="relative mt-2 h-6 w-6 flex-none rounded-full bg-gray-50"
          />
          <div className="relative ml-[17px] w-full rounded-md px-3 pb-2 pt-3 ring-1 ring-inset ring-gray-300 focus-within:z-10  ">
            <textarea
              name="content"
              id="content"
              className={`block h-auto w-full rounded-sm border-0 p-0 pl-2 pt-1 font-sans text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
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
              <div className="pl-2 pt-1 font-sans text-xs font-bold text-red-500">
                {formik.errors.content}
              </div>
            )}
            <div className="mt-1 flex h-6 items-center">
              <input
                id="anon"
                name="anon"
                type="checkbox"
                disabled={loggedIn ? false : true}
                className="hover:cursor-pointer"
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
        </div>
        <div className="float-left my-2 flex w-full max-w-[500px] justify-between">
          {loggedIn && formik.values.attachments?.length < MAX_UPLOADS && (
            <div className="ml-10">
              <lr-file-uploader-regular
                css-src="https://esm.sh/@uploadcare/blocks@0.22.13/web/file-uploader-regular.min.css"
                ctx-name="comment-uploader"
                class="my-config"
              ></lr-file-uploader-regular>
              <lr-data-output
                id="data-output"
                ctx-name="comment-uploader"
              ></lr-data-output>
            </div>
          )}
          {formik.values.attachments?.length >= MAX_UPLOADS && (
            <p className="ml-10 font-sans text-sm text-red-600">
              Upload limit reached
            </p>
          )}
          <button
            type="submit"
            color="rgb(239, 240, 240)"
            className={`w-15 h-8 rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] ${
              !loggedIn && "ml-10"
            }`}
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
      {attachments &&
        attachments.map((attachment, index) => {
          return (
            <>
              <div className="w-max self-center">
                <img
                  className="w-full max-w-[500px] self-center"
                  src={attachment.url}
                />
                <button
                  type="submit"
                  className="w-15 relative mb-2 mt-2 h-8 rounded-md bg-red-200 px-2 font-sans text-sm font-normal text-red-500 hover:bg-red-300 hover:text-red-600"
                  onClick={() => {
                    formik.setFieldValue("attachments", [
                      ...(formik.values.attachments as any[]).slice(0, index),
                      ...(formik.values.attachments as any[]).slice(index + 1),
                    ]);
                  }}
                >
                  Delete Image
                </button>
              </div>
            </>
          );
        })}
    </>
  );
}
