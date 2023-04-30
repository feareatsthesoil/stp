import React from "react"
import axios from "axios"
import { FormHelperText, MenuItem, TextField, Unstable_Grid2 as Grid } from "@mui/material"
import { withStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { DateTimePicker } from "@mui/x-date-pickers"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAuth } from "@clerk/nextjs";
import GooglePlacesAutoComplete from "../GooglePlacesAutoComplete"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

import css from "src/styles/Form.module.css"

const initialState = { name: "", type: "", address: "", website: "", starts_at: null, ends_at: null, phone: "", email: "", description: "" }

const type = [
  {
    value: "In-person meeting"
  },
  {
    value: "Remote meeting"
  },
  {
    value: "Exhibit"
  },
  {
    value: "Pop up event"
  }
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

export default function CalendarForm({ }: { profile: boolean }) {
  let isMax = false;
  const [loading, setLoading] = useState(false)
  const { getToken } = useAuth()

  const formik = useFormik({
    validationSchema: Yup.object({
      name:
        Yup.string()
          .required("Name is required")
          .max(20, "Must be at most 20 characters")
          .min(2, "Must be at least 2 characters"),

      address:
        Yup.string()
          .required("Location is required")
          .min(2),

      starts_at:
        Yup.date()
          .required("Start Date/Time is required")
          .typeError("Must be a valid date")
          .min(new Date(), "Must be after current date/time")
          .transform((_, val) => val === null ? undefined : new Date(val)),

      ends_at:
        Yup.date()
          .typeError("Must be a valid date")
          .min(new Date(), "Must be after current date/time")
          .transform((_, val) => val === null ? undefined : new Date(val)),

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

    }),
    initialValues: { ...initialState }, onSubmit: async (values, helpers) => {


      const dataToSubmit = {
        ...values
      }
      const response = await axios.post("/api/calendar/submit", dataToSubmit)
      helpers.setSubmitting(false)
      helpers.resetForm()
    }
  })

  formik.values.description.length === 300 ? isMax = true : isMax = false;

  return (
    <div className={css.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2} sx={{ maxWidth: "sm" }}  >
            <Grid xs={12} sm={6} >
              <CssTextField
                name="name"
                label="Name of Happening"
                required fullWidth
                color="secondary"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={!!formik.errors.name}
                helperText={formik.errors.name}
                disabled={formik.isSubmitting} />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="type"
                label="Type of Happening"
                required select fullWidth
                color="secondary"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={!!formik.errors.type}
                helperText={formik.errors.type}
                disabled={formik.isSubmitting}>
                {type.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </CssTextField>
            </Grid>
            <Grid xs={12} sm={6}>
              <GooglePlacesAutoComplete
                disabled={formik.isSubmitting}
                onChange={(value) => formik.setFieldValue("address", value)} value={formik.values.address} />
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
                disabled={formik.isSubmitting} />
            </Grid>
            <Grid xs={12} sm={6}>
              <DateTimePicker
                label="Start Date/Time *"
                disablePast
                className={css.datePicker}
                sx={{
                  "& label.Mui-focused": {
                    color: "black"
                  },
                  "& fieldset": {
                    border: "1px solid black",
                    color: "black"
                  },
                  "&:hover fieldset": {
                    border: "2px solid black",
                    color: "black"
                  },
                  "& .Mui-focused fieldset": {
                    border: "2px solid black !important"
                  },
                  "& .MuiInputBase-colorError fieldset ": {
                    borderColor: "#d32f2f!important"
                  },
                  "& .MuiInputBase-colorError.Mui-focused fieldset": {
                    borderColor: "#d32f2f!important"
                  },
                  ".MuiFormLabel-colorError.Mui-focused": {
                    color: "#d32f2!important"
                  }
                }}
                value={formik.values.starts_at}
                onChange={(value) => formik.setFieldValue("starts_at", value)}
                disabled={formik.isSubmitting}
              />
              <div >
                <FormHelperText
                  className="helperText"
                  error={!!formik.errors.starts_at}>
                  {formik.errors.starts_at}
                </FormHelperText>
              </div>
            </Grid>
            <Grid xs={12} sm={6}>
              <DateTimePicker
                label="End Date/Time"
                disablePast
                className={css.datePicker}
                sx={{
                  "& label.Mui-focused": {
                    color: "black"
                  },
                  "& fieldset": {
                    border: "1px solid black",
                    color: "black"
                  },
                  "&:hover fieldset": {
                    border: "2px solid black",
                    color: "black"
                  },
                  "& .Mui-focused fieldset": {
                    border: "2px solid black !important"
                  },
                  "& .MuiInputBase-colorError fieldset ": {
                    borderColor: "#d32f2f!important"
                  },
                  ".MuiFormLabel-colorError": {
                    color: "#d32f2f!important"
                  }
                }}
                value={formik.values.ends_at}
                onChange={(value) => formik.setFieldValue("ends_at", value)}
                disabled={formik.isSubmitting}
              />
              <FormHelperText
                className="helperText"
                error={!!formik.errors.ends_at}>
                {formik.errors.ends_at}
              </FormHelperText>
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
                disabled={formik.isSubmitting} />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="email"
                label="Email"
                required fullWidth
                color="secondary"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!formik.errors.email}
                helperText={formik.errors.email}
                disabled={formik.isSubmitting} />
            </Grid>
            <Grid xs={12}>
              <CssTextField
                label="Short Description"
                name="description"
                multiline fullWidth
                className={css.description} id="mui-theme-provider-outlined-input"
                variant="outlined"
                color="secondary"
                rows={4}
                inputProps={{
                  maxLength: 300,
                  style: { color: "black" }
                }}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={!!formik.errors.description}
                helperText={formik.errors.description}
                disabled={formik.isSubmitting} />
            </Grid>
            <Grid xs={12}>
              <p className={isMax ? css.max : css.notMax}>
                {formik.values.description.length}/300
              </p>
              <button
                disabled={formik.isSubmitting}
                type={"submit"}
                className={css.button}>
                {!formik.isSubmitting && <>Save</>}
                {formik.isSubmitting &&
                  <span style={{ paddingRight: 2 }}>
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </span>
                }
              </button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </form>
    </div>
  )
}