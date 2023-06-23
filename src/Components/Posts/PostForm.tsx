import { Button, Input, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { createPost } from "../../utils/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Widget } from "@uploadcare/react-widget";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#000",
    },
  },
});

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      fontFamily: "Times New Roman",
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderWidth: "2px",
      },
      "& .Mui-error fieldset": {
        borderColor: "black!important",
      },
    },
    "& .MuiOutlinedInput-root.Mui-error": {
      "& fieldset": {
        borderColor: "black!important",
      },
    },
    "& .MuiFormLabel-root": {
      fontFamily: "Times New Roman",
      color: "black",
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: "black!important",
      "& span": {
        color: "black!important",
      },
    },
    "& .MuiOutlinedInput-input": {
      "& fieldset": {
        fontFamily: "Times New Roman",
      },
    },
  },
})(TextField);

export default function PostForm({ slug }: { slug: string }) {
  const router = useRouter();

  const formik = useFormik({
    validationSchema: Yup.object({
      title: Yup.string().required("Name is required"),
      content: Yup.string().required("Content is required"),
      attachment: Yup.string().url().nullable(),
    }),
    initialValues: { title: "", content: "", attachment: null },
    onSubmit: async (values, helpers) => {
      const dataToSubmit = {
        ...values,
      };
      await createPost(slug, dataToSubmit);
      helpers.setSubmitting(false);
      helpers.resetForm();

      router.push("/chan/" + slug);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <ThemeProvider theme={theme}>
        <CssTextField
          sx={{
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            borderRadius: "4px",
          }}
          label="Name"
          name="title"
          fullWidth
          required
          color="secondary"
          variant="outlined"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={!!formik.errors.title}
          helperText={formik.errors.title}
          disabled={formik.isSubmitting}
        />
        <CssTextField
          sx={{
            margin: "10px 0 0 0",
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            borderRadius: "4px",
          }}
          label="Content"
          rows={3}
          variant="outlined"
          name="content"
          fullWidth
          required
          multiline={true}
          color="secondary"
          value={formik.values.content}
          onChange={formik.handleChange}
          error={!!formik.errors.content}
          helperText={formik.errors.content}
          disabled={formik.isSubmitting}
        />
        <Widget
          systemDialog={true}
          publicKey="298fc65a2986318fd270"
          onChange={(info) => {
            formik.setFieldValue("attachment", info.cdnUrl);
          }}
        />
        <Button
          sx={{
            float: "right",
            backgroundColor: "rgb(239, 239, 239)!important",
            textTransform: "none",
            fontFamily: "Helvetica",
            fontSize: "1em",
            borderRadius: "4px",
            color: "#000",
            border: "1px solid #000",
            height: "30px",
            margin: "10px 0 0 0",
            "&:hover ": {
              backgroundColor: "#dcdcdc !important;",
            },
          }}
          type="submit"
          color="secondary"
          variant="contained"
        >
          {!formik.isSubmitting && <>Save</>}
          {formik.isSubmitting && (
            <span style={{ paddingRight: 2 }}>
              <FontAwesomeIcon icon={faSpinner} spin />
            </span>
          )}
        </Button>
      </ThemeProvider>
    </form>
  );
}
