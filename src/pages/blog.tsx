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
      <div className="pb-5">
        <p className="mt-4 pb-6 font-bold">Subscribe to our blog!</p>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Grid container spacing={2}>
              <Grid className="pl-4 pr-2">
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
              </Grid>
              <Grid>
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
              </Grid>
            </Grid>
          </div>
        </form>
        <div ref={embedRef} id="custom-substack-embed"></div>
      </div>
      {posts?.map((post) => {
        return (
          <>
            <div
              className="min-w-[400px] max-w-[800px] max-[600px]:min-w-[200px]"
              style={{
                lineHeight: "25px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <Link href={post.canonical_url} target="_blank">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
                    <div
                      className="h-[150px] w-[100%] min-w-[100px] max-w-[300px] max-[575px]:mb-[-25px] max-[575px]:h-[500px] max-[575px]:max-w-none"
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
                    <div className="font-bold">{post.title}</div>
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
      <p className="pb-4 font-sans">
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
    </DefaultLayout>
  );
}
