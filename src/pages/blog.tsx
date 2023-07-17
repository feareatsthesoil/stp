import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useConfirm } from "material-ui-confirm";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import DefaultLayout from "../Components/Layouts/DefaultLayout";
import { Post } from "../types/substack";

const initialState = { email: "" };

export default function Blog() {
  const embedRef = useRef<HTMLDivElement>(null);

  const confirm = useConfirm();
  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().required("Required").email("Must be a valid email"),
    }),
    initialValues: { ...initialState },

    onSubmit: async (values, helpers) => {
      const response = await axios.post(
        "https://substackapi.com/api/subscribe",
        { email: values.email, domain: "blog.stp.world" }
      );
      helpers.setSubmitting(false);
      helpers.resetForm();
      confirm({
        title: "We've sent you an email!",
        description: "Click on link inside to verify.",
        hideCancelButton: true,
      });
    },
  });

  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    axios
      .get("https://substackapi.com/api/feeds/blog.stp.world?limit=12&sort=new")
      .then(({ data }) => {
        setPosts(data);
      });
  }, []);

  return (
    <DefaultLayout>
      <div className="w-[80vw] max-w-[1000px] lg:w-auto">
        <p className="mb-2 mt-4 font-bold">Subscribe to our blog!</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex space-x-2">
            <TextField
              sx={{
                "& fieldset": {
                  borderRadius: "4px",
                  padding: "0px",
                  alignSelf: "center",
                  border: "1px solid black",
                  boxShadow:
                    "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                },
                "& input": {
                  fontFamily: "Helvetica",
                  fontSize: ".8em",
                  padding: "11px",
                  height: "10px",
                },
              }}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={!!formik.errors.email}
              helperText={formik.errors.email}
            />
            <Button
              sx={{
                float: "right",
                backgroundColor: "rgb(239, 239, 239) !important",
                textTransform: "none",
                fontFamily: "Helvetica",
                fontSize: ".8em",
                borderRadius: "4px",
                color: "#000",
                border: "1px solid #000",
                height: "31.8px",
                padding: "0 8px",
                "&:hover ": {
                  backgroundColor: "rgb(220, 220, 220) !important;",
                },
              }}
              color="secondary"
              variant="contained"
              disabled={formik.isSubmitting}
              type={"submit"}
            >
              {!formik.isSubmitting && <>Subscribe</>}
              {formik.isSubmitting && (
                <span style={{ paddingRight: 2 }}>
                  <FontAwesomeIcon icon={faSpinner} spin />
                </span>
              )}
            </Button>
          </div>
        </form>
        <div ref={embedRef} id="custom-substack-embed"></div>
        {posts?.map((post) => {
          return (
            <>
              <div
                className=" max-w-[800px]"
                style={{
                  lineHeight: "25px",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                <Link href={post.canonical_url} target="_blank">
                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <div
                        className="mr-4 mt-4  mdMobileX:mr-0 h-[150px] min-w-[100px] smMuiMobileX:h-[60vh]"
                        style={{
                          backgroundImage: `url(${post.cover_image})`,
                          boxShadow:
                            "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "50%",
                          backgroundSize: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <div className="mt-2 font-bold">
                        {post.title}
                      </div>
                      <div>{post.subtitle}</div>
                      <div>
                        <ul className="flex list-none text-[0.8em]">
                          <li className="py-[10px] pr-[10px] uppercase">
                            <p className="mt-[-3px]"> {post.post_date}</p>
                          </li>
                        </ul>
                      </div>
                    </Grid>
                  </Grid>
                </Link>
              </div>
            </>
          );
        })}
        <p className="my-4 font-sans">
          See more at{" "}
          <Link
            target="webapp_tab"
            className="text-blue-600 hover:text-indigo-600 hover:underline"
            href="https://blog.stp.world"
          >
            blog.stp.world
          </Link>
          .
        </p>
      </div>
    </DefaultLayout>
  );
}
