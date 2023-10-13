import { useUser } from "@clerk/nextjs";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as LR from "@uploadcare/blocks";
import { useFormik } from "formik";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import { UserContext } from "../../userContext";
import { createComment } from "../../../utils/services";

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
  const pathname = usePathname();
  const { slug } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { loggedIn } = useContext(UserContext);

  function autoResizeTextarea(event: any) {
    event.target.style.height = "inherit";
    const computed = window.getComputedStyle(event.target);
    const border =
      parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);
    event.target.style.height = `${event.target.scrollHeight + border}px`;
  }

  const formik = useFormik({
    validationSchema: Yup.object({
      content: Yup.string()
        .required("Content is required")
        .max(10000, "Must be within 10,000 characters."),
      attachments: Yup.array().of(Yup.object()),
    }),
    initialValues: { content: "", anon: false, attachments: [] as any[] },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (slug === "all") {
        router.push("/gc");
        return;
      }
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

  const listener = (e: any) => {
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
          height: data.imageInfo?.height,
          width: data.imageInfo?.width,
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
      router.push("/login?redirect_url=" + encodeURIComponent(pathname));
      return;
    }

    formik.handleSubmit(event);
  };

  const isDisabled = !user || formik.isSubmitting;

  return (
    <>
      <form onSubmit={handleSubmitWithAuth}>
        <div className="relative flex max-w-[1000px]">
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
              (e.target as HTMLImageElement).src =
                "https://ucarecdn.com/8c962272-5ea0-425a-851a-8b834177ea26/";
            }}
            className="relative mt-2 h-6 w-6 flex-none rounded-full bg-gray-50"
          />
          <div className="relative ml-4 w-full rounded-md px-3 pb-2 pt-3 ring-1 ring-inset ring-gray-300 focus-within:z-10  ">
            <textarea
              name="content"
              id="content"
              className={`block h-auto w-full rounded-sm border-0 p-0 pl-2 pt-1 font-sans text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:leading-6 ${
                isDisabled ? "cursor-not-allowed" : ""
              }`}
              placeholder="Comment"
              value={formik.values.content ?? ""}
              onInput={autoResizeTextarea}
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
                className={`hover:cursor-pointer `}
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
        <div
          className={`my-2 flex w-full max-w-[1000px] ${
            loggedIn ? "justify-between" : "justify-end"
          }`}
        >
          {loggedIn && formik.values.attachments?.length < MAX_UPLOADS && (
            <div className="ml-10">
              {/* @ts-ignore */}
              <lr-file-uploader-regular
                css-src="https://esm.sh/@uploadcare/blocks@0.22.13/web/file-uploader-regular.min.css"
                ctx-name="comment-uploader"
                class="my-config"
              >
                {/* @ts-ignore */}
              </lr-file-uploader-regular>
              {/* @ts-ignore */}
              <lr-data-output id="data-output" ctx-name="comment-uploader">
                {/* @ts-ignore */}
              </lr-data-output>
            </div>
          )}
          {formik.values.attachments?.length >= MAX_UPLOADS && (
            <button
              type="submit"
              className="w-15 float-right ml-10 h-8 cursor-not-allowed rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50]"
            >
              10/10 Uploads
            </button>
          )}
          <button
            type="submit"
            className="w-15 float-right h-8 rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6]"
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
      {formik.values.attachments && formik.values.attachments.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="relative mb-2 mt-2 flex flex-row flex-wrap place-content-center gap-x-2 self-center rounded-md px-3 pb-0.5 pt-3 font-sans ring-1 ring-inset ring-gray-300 focus-within:z-10 mdMobileX:flex-col">
            {formik.values.attachments.map((attachment, index) => (
              <div
                className="self-center"
                style={{ maxWidth: "100%" }}
                key={index}
              >
                <img
                  className="max-h-[60vh] self-center"
                  src={attachment.url}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
                <button
                  type="submit"
                  className="w-15 relative float-left mb-2 mt-2 h-8 rounded-md bg-red-200 px-2 font-sans text-sm font-normal text-red-500 hover:bg-red-300 hover:text-red-600"
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
            ))}
          </div>
        </div>
      )}
    </>
  );
}
