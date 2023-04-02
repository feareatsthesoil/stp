import React, { useEffect } from "react"
import form from "src/styles/Form.module.css"
import axios from "axios"

import { MenuItem, TextField, Unstable_Grid2 as Grid } from "@mui/material"
import { withStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { DateTimeField } from "@mui/x-date-pickers"
import { useState } from "react"
import ElementLoader from "../ElementLoader"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from "@clerk/nextjs";
import GooglePlacesAutoComplete from "../GooglePlacesAutoComplete"
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

export default function CalendarForm({ profile = false }: { profile: boolean }) {

  const [loading, setLoading] = useState(false)
  const { getToken } = useAuth()
  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").max(20, "Name must be at most 20 characters").min(2, "Name must be at least 2 characters"),
      email: Yup.string().required("Email is required").email("Email must be a valid email"),
      address: Yup.string().min(2),
      starts_at: Yup.date().required().typeError("Invalid date").min(new Date(), "must be greater than today"),
      ends_at: Yup.date().notRequired().typeError("Invalid date").min(Yup.ref("starts_at"), "must be greater than start date")
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

  return (
    <div className={form.test}>

      {loading && <ElementLoader />}
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
                helperText={formik.errors.name} />
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
                helperText={formik.errors.type}>
                {type.map((option) => (
                  <MenuItem
                    className="menuitem"
                    key={option.value}
                    value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </CssTextField>
            </Grid>
            <Grid xs={12} sm={6}>
              <GooglePlacesAutoComplete
                
                onChange={(value) => formik.setFieldValue("address", value)} value={formik.values.address} />
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
                helperText={formik.errors.website} />
            </Grid>
            <Grid xs={12} sm={6}>
              <DateTimeField
              required
                label="Start Date/Time"
                disablePast
                className={form.datePicker}
                sx={{
                  "& label.Mui-focused": { color: "black" },
                  "& fieldset": { border: "1px solid black!important", 
                  color: "black" },
                  "&:hover fieldset": { border: "2px solid black!important", color: "black" },
                  "& .Mui-focused fieldset": { border: "2px solid black !important"},
                  "& .Mure-required p": {color: "#d32f2f!important"},
                  "& .Mui-required fieldset": { border: "2px solid red !important"}
                }}
                helperText={formik.errors.starts_at}
                color={!!formik.errors.starts_at ? "error" : "primary"}
                value={formik.values.starts_at}
                onChange={(value) => formik.setFieldValue("starts_at", value)}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <DateTimeField
                label="End Date/Time"
                className={form.datePicker}
                sx={{
                  "& label.Mui-focused": { color: "black" },
                  "& fieldset": { border: "1px solid black!important", color: "black" },
                  "&:hover fieldset": { border: "2px solid black!important", color: "black" },
                  "& .Mui-focused fieldset": { border: "2px solid black !important" }
                }}
                value={formik.values.ends_at}
                onChange={(value) => formik.setFieldValue("ends_at", value)}
              />
              {formik.errors.ends_at}
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField
                name="phone"
                label="Telephone"
                fullWidth
                color="secondary" value={formik.values.phone} onChange={formik.handleChange}
                error={!!formik.errors.phone}
                helperText={formik.errors.phone} />
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
                helperText={formik.errors.email} />
            </Grid>
            <Grid xs={12}>
              <CssTextField
                label="Short Description"
                name="description"
                multiline fullWidth
                className={form.description} id="mui-theme-provider-outlined-input"
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
                helperText={formik.errors.description} />
            </Grid>
            <Grid xs={12}>
              <p>{formik.values.description.length}/300</p>
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