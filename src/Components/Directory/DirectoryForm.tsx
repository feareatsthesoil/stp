import { useContext, useState } from "react"
import form from "src/styles/Form.module.css"
import axios from 'axios'
import { Checkbox, MenuItem, TextField, Unstable_Grid2 as Grid } from "@mui/material"
import { withStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import React from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ElementLoader from "../ElementLoader";
import { useRouter } from "next/router"
import GooglePlacesAutoComplete from "../GooglePlacesAutoComplete"
import { DirectoryRow } from "../../types"
import { UserContext } from "../UserContext"

const initialState = { name: "", address: "", email: "", category: "", website: "", phone: "", instagram: "", twitter: "", description: "", display: true }

const type = [
  {
    value: "Photographer"
  },
  {
    value: "Painter"
  },
  {
    value: "Writer"
  },
  {
    value: "Producer"
  },
  {
    value: "Coder"
  },
]

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderWidth: "2px",
      },
    },
  },
})(TextField);

const theme = createTheme({
  palette: {
    secondary: {
      main: "#000",
    },
  },
});

const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export default function DirectoryForm({ profile = false, data }: { profile: boolean, data?: DirectoryRow }) {

  const { refresh } = useContext(UserContext)
  let isMax = false;

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    validationSchema: Yup.object({
      name:
        Yup.string()
          .required("Name is required")
          .max(20, "Must be at most 20 characters")
          .min(2, "Must be at least 2 characters"),

      category:
        Yup.string()
          .required("Category is required"),

      address:
        Yup.string(),

      phone:
        Yup.string()
          .matches(rePhoneNumber, "Must be a valid phone number"),

      email:
        Yup.string()
          .required("Email is required")
          .email("Must be a valid email"),

    }),
    initialValues: { ...initialState, display: !profile, ...(data ?? {}) }, onSubmit: async (values, helpers) => {


      const dataToSubmit = {
        ...values, profile
      }
      const response = data?.id ? await axios.put(`/api/directory/${data.id}`, dataToSubmit) : await axios.post("/api/directory/submit", dataToSubmit)

      await refresh()
      helpers.setSubmitting(false)
      if (!data) helpers.resetForm()
      if (profile && !data)
        router.push("/")
    }
  })

  formik.values.description.length === 300 ? isMax = true : isMax = false;

  return (
    <div className={form.body}>
      <form onSubmit={formik.handleSubmit}>
        {formik.isSubmitting && <ElementLoader />}
        <ThemeProvider theme={theme}>
          <Grid container spacing={2} sx={{ maxWidth: "sm" }}  >
            <Grid xs={12} sm={6} >
              <CssTextField
                name="name"
                label="Name/Business"
                required fullWidth
                color="secondary"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={!!formik.errors.name}
                helperText={formik.errors.name}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="category"
                label="Category"
                required select fullWidth
                color="secondary"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={!!formik.errors.category}
                helperText={formik.errors.category}
              >
                {type.map((option) => (
                  <MenuItem
                    className="bolder"
                    key={option.value}
                    value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </CssTextField>
            </Grid>
            <Grid xs={12} sm={6}>
              <GooglePlacesAutoComplete
                value={formik.values.address}
                onChange={(val) => formik.setFieldValue("address", val)} />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="website"
                label="Website"
                fullWidth
                color="secondary"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={!!formik.errors.website}
                helperText={formik.errors.website}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="phone"
                label="Telephone"
                fullWidth
                color="secondary"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={!!formik.errors.phone}
                helperText={formik.errors.phone}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="email"
                label="Email"
                required fullWidth
                color="secondary"
                value={formik.values.email}
                onChange={formik.handleChange}
                helperText={formik.errors.email}
                error={!!formik.errors.email} />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="instagram"
                label="Instagram"
                fullWidth
                color="secondary"
                value={formik.values.instagram}
                onChange={formik.handleChange}
                helperText={formik.errors.instagram}
                error={!!formik.errors.instagram} />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="twitter"
                label="Twitter"
                fullWidth
                color="secondary"
                value={formik.values.twitter}
                onChange={formik.handleChange}
                helperText={formik.errors.twitter}
                error={!!formik.errors.twitter} />
            </Grid>
            <Grid xs={12}>
              <CssTextField
                name="description"
                label="Short Description"
                multiline fullWidth
                color="secondary"
                rows={4}
                inputProps={{
                  maxLength: 300,
                  style: { color: "black" }
                }}
                value={formik.values.description}
                onChange={formik.handleChange}
                helperText={formik.errors.description}
              />
            </Grid>
            {profile && <>
              <Checkbox
                name="display"
                sx={{
                  padding: "0px 5px 0 5px",
                  margin: "-4px 0 0 0",
                  color: "black",
                  '&.Mui-checked': {
                    color: "black",
                  },
                  '&:hover': {
                    backgroundColor: "#fff",
                  },
                  '& .input': {
                    backgroundColor: "black",
                    borderRadius: "0",
                    border: "1px solid black",
                  }
                }}
                onChange={formik.handleChange}
                checked={formik.values.display} />
              <label htmlFor="display">Display in directory</label>
            </>}
            <Grid xs={12}>
              <p className={isMax ? form.max : form.notMax}>
                {formik.values.description.length}/300
              </p>
              <button
                type={"submit"}
                className={form.button}>
                Save
              </button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </form>
    </div>
  )
}