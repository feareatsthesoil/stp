
import { Button, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { createPost } from "../../utils/services";

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
  },
})(TextField);

export default function PostForm({ slug }: { slug: string }) {
  const router = useRouter();

  const formik = useFormik({
    validationSchema: Yup.object({
      title: Yup.string().required("required"),
      content: Yup.string().required("required"),
    }),
    initialValues: { title: "", content: "" },
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
          label="Name"
          name="title"
          fullWidth
          color="secondary"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={!!formik.errors.title}
          helperText={formik.errors.title}
          disabled={formik.isSubmitting}
        />
        <CssTextField
          sx={{ margin: "10px 0 0 0" }}
          label="Content"
          rows={3}
          name="content"
          fullWidth
          multiline={true}
          color="secondary"
          value={formik.values.content}
          onChange={formik.handleChange}
          error={!!formik.errors.content}
          helperText={formik.errors.content}
          disabled={formik.isSubmitting}
        />
        <Button
          sx={{
            float: "right",
            backgroundColor: "rgb(239, 239, 239)",
            textTransform: "none",
            fontFamily: "Helvetica",
            fontSize: "1em",
            borderRadius: "4px",
            color: "#000",
            border: "1px solid #000",
            height: "30px",
            margin: "10px 0 0 0",
            "&:hover ": {
              backgroundColor: "rgb(220, 220, 220) !important;",
            },
          }}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Save
        </Button>
      </ThemeProvider>
    </form>
  );
}
