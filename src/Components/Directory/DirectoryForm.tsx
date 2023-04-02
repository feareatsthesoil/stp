import { useState } from "react"
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
const initialState = { name: "", address: "", email: "", category: "", website: "", phone: "", description: "", display: true }

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

export default function DirectoryForm({ profile = false }: { profile: boolean }) {

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").max(20, "Must be maximum 20 characters").min(2),
      email: Yup.string().required().email(),
      address: Yup.string().min(2),
      category: Yup.string().required(),
      // website: Yup.string
    }),
    initialValues: { ...initialState, display: !profile }, onSubmit: async (values, helpers) => {


      const dataToSubmit = {
        ...values, profile
      }
      const response = await axios.post("/api/directory/submit", dataToSubmit)
      helpers.setSubmitting(false)
      helpers.resetForm()
      if(profile)
      router.push("/")
    }
  })

  return (
    <div className={form.test}>
      <form onSubmit={formik.handleSubmit}>
        {formik.isSubmitting && <ElementLoader />}
        <ThemeProvider theme={theme}>
          <Grid container spacing={2} sx={{ maxWidth: "sm" }}  >
            <Grid xs={12} sm={6} >
              <CssTextField name="name" label="Name/Business" fullWidth color="secondary" value={formik.values.name} onChange={formik.handleChange}
                error={!!formik.errors.name}
                helperText={formik.errors.name}
              />

            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField label="Category" name="category" select fullWidth color="secondary" value={formik.values.category} onChange={formik.handleChange}
                error={!!formik.errors.category}
                helperText={formik.errors.category}
              >
                {type.map((option) => (
                  <MenuItem className="bolder" key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </CssTextField>
            </Grid>
            <Grid xs={12} sm={6}>
              {/* <CssTextField value={formik.values.address} name="address" label="Location" fullWidth color="secondary" onChange={formik.handleChange}
                error={!!formik.errors.address}
                helperText={formik.errors.address}

              /> */}

              <GooglePlacesAutoComplete value={formik.values.address}onChange={(val)=>formik.setFieldValue("address", val)} />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField value={formik.values.website} name="website" label="Website" fullWidth color="secondary" onChange={formik.handleChange}
                error={!!formik.errors.website}
                helperText={formik.errors.website}

              />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField value={formik.values.phone} name="phone"
                error={!!formik.errors.phone}
                helperText={formik.errors.phone}
                label="Telephone" fullWidth color="secondary" onChange={formik.handleChange} />
            </Grid>
            <Grid xs={12} sm={6}>
              <CssTextField value={formik.values.email}
                helperText={formik.errors.email}
                error={!!formik.errors.email}
                name="email" label="Email" fullWidth color="secondary" onChange={formik.handleChange} />
            </Grid>
            <Grid xs={12}>
              <CssTextField value={formik.values.description}

                helperText={formik.errors.description}

                name="description" label="Short Description" multiline fullWidth className={form.description} id="mui-theme-provider-outlined-input" variant="outlined" color="secondary" rows={4} inputProps={{ maxLength: 300, style: { color: "black" } }} onChange={formik.handleChange} />
            </Grid>
            {profile && <> <Checkbox name="display" onChange={formik.handleChange} checked={formik.values.display} /> Display in directory
            </>}
            <Grid xs={12}>
              <p>{formik.values.description.length}/300</p>
              <button type={"submit"} className={form.button}>Save</button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </form>
    </div>
  )
}