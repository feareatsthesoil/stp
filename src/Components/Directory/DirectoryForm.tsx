import React from "react";
import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { FormHelperText, InputAdornment, TextField, Unstable_Grid2 as Grid, Button } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { withStyles } from "@mui/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

import css from "src/styles/Form.module.css"
import { DirectoryRow } from "../../types"
import { UserContext } from "../UserContext"
import AdornedTextBox from "../AdornedTextBox"
import GooglePlacesAutoComplete from "../GooglePlacesAutoComplete"

const initialState = { name: "", pronouns: "", address: "", email: "", category: "", website: "", phone: "", instagram: "", twitter: "", description: "", display: true }

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
      }
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: "black!important",
      "& span": {
        color: "black!important",
      }
    }
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
const reInsta = /^[a-zA-Z_](?!.*?\.{2})[\w.]{1,28}[\w]$/;
const reTwitter = /^(\w){1,15}$/;

export default function DirectoryForm({ profile = false, data }: { profile: boolean, data?: DirectoryRow }) {

  const [isSelected] = useState(false);

  const iconAdornment = isSelected
    ? {
      startAdornment: (
        <InputAdornment position="start">@</InputAdornment>
      )
    }
    : {};

  const { refresh, initialized, isMember } = useContext(UserContext)
  let isMax = false;
  const router = useRouter()
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
        Yup.string()
          .required("Location is required"),

      phone:
        Yup.string()
          .matches(rePhoneNumber, "Must be a valid phone number"),

      email:
        Yup.string()
          .required("Email is required")
          .email("Must be a valid email"),

      website:
        Yup.string()
          .url("Must be a valid URL starting with http(s)://"),

      instagram:
        Yup.string()
          .matches(reInsta, "Must be a valid username"),

      twitter:
        Yup.string()
          .matches(reTwitter, "Must be a valid username")

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

  if (!initialized)
    return <></>
  return (
    <div className={css.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2} sx={{ maxWidth: "sm" }}  >
            <Grid xs={12} sm={6} >
              <CssTextField
                name="name"
                label="Name"
                required fullWidth
                color="secondary"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={!!formik.errors.name}
                helperText={formik.errors.name}
                disabled={formik.isSubmitting}
              />
            </Grid>
            <Grid xs={12} sm={6} >
              <CssTextField
                name="pronouns"
                label="Pronouns"
                fullWidth
                color="secondary"
                value={formik.values.pronouns}
                onChange={formik.handleChange}
                error={!!formik.errors.pronouns}
                helperText={formik.errors.pronouns}
                disabled={formik.isSubmitting}
              />
            </Grid>
            <Grid xs={12} sm={12}>
              <CssTextField
                name="category"
                label="What do you do?"
                required
                fullWidth
                color="secondary"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={!!formik.errors.category}
                helperText={formik.errors.category}
                disabled={formik.isSubmitting}
              />
            </Grid>
            <Grid xs={12} sm={6} >
              <GooglePlacesAutoComplete
                error={!!formik.errors.address}
                disabled={formik.isSubmitting}
                value={formik.values.address}
                onChange={(val) => formik.setFieldValue("address", val)}
              />
              <div >
                <FormHelperText
                  className="helperText"
                  error={!!formik.errors.address}>
                  {formik.errors.address}
                </FormHelperText>
              </div>
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
                disabled={formik.isSubmitting}
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
                disabled={formik.isSubmitting}
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
                error={!!formik.errors.email}
                disabled={formik.isSubmitting} />
            </Grid>
            <Grid xs={12} sm={6}>
              <AdornedTextBox
                adornment={<InputAdornment position="start">@</InputAdornment>}
                name="instagram"
                label="Instagram"
                fullWidth
                InputProps={iconAdornment}
                color="secondary"
                sx={{
                  "& fieldset": {
                    borderColor: "#000 !important",
                  },
                  "& label": {
                    color: "#000 !important"
                  }
                }}
                value={formik.values.instagram}
                onChange={formik.handleChange}
                helperText={formik.errors.instagram}
                error={!!formik.errors.instagram}
                disabled={formik.isSubmitting} />
            </Grid>
            <Grid xs={12} sm={6}>
              <AdornedTextBox
                adornment={<InputAdornment position="start">@</InputAdornment>}
                name="twitter"
                label="Twitter"
                fullWidth
                InputProps={iconAdornment}
                color="secondary"
                sx={{
                  "& fieldset": {
                    borderColor: "#000 !important",
                  },
                  "& label": {
                    color: "#000 !important"
                  },
                }}
                value={formik.values.twitter}
                onChange={formik.handleChange}
                helperText={formik.errors.twitter}
                error={!!formik.errors.twitter}
                disabled={formik.isSubmitting} />
            </Grid>
            <Grid xs={12}>
              <CssTextField
                name="description"
                label="Short Bio"
                multiline fullWidth
                color="secondary"
                rows={4}
                inputProps={{
                  maxLength: 300,
                }}
                value={formik.values.description}
                onChange={formik.handleChange}
                helperText={formik.errors.description}
                disabled={formik.isSubmitting}
              />
            </Grid>
            {profile && <>
              <input className={css.checkBox} type="checkbox" name="display" onChange={formik.handleChange}
                checked={formik.values.display}
                disabled={formik.isSubmitting} >
              </input>
              <label htmlFor="display">Display in directory</label>
            </>}
            <Grid xs={12}>
              <p className={isMax ? css.max : css.notMax}>
                {formik.values.description.length}/300
              </p>
              <Button
                sx={{
                  float: "right",
                  backgroundColor: "rgb(239, 239, 239)",
                  textTransform: "none",
                  fontFamily: "Helvetica",
                  fontSize: "0.8em",
                  borderRadius: "4px",
                  color: "#000",
                  border: "1px solid #000",
                  height: "30px",
                  margin: "-30px 0 0 0",
                  "&:hover ": {
                    backgroundColor: "rgb(220, 220, 220) !important;",
                  }
                }}
                disabled={formik.isSubmitting}
                type={"submit"}
                className={css.button}>
                {!formik.isSubmitting && <>Save</>}
                {formik.isSubmitting &&
                  <span style={{ paddingRight: 2 }}>
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </span>
                }
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </form>
    </div>
  )
}