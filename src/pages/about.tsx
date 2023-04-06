import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import index from "../styles/About.module.css"
import Nav from "../Components/Nav/Nav"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from "axios"
import { TextField, Unstable_Grid2 as Grid } from "@mui/material"
import { withStyles } from "@mui/styles"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

const initialState = { email: "" }

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

const About = () => {

  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().required("Required").email(),
    }),
    initialValues: { ...initialState }, onSubmit: async (values, helpers) => {

      const dataToSubmit = {
        ...values
      }
      const response = await axios.post("/api/about", dataToSubmit)
      helpers.setSubmitting(false)
      helpers.resetForm()
    }
  })

  return (
    <DefaultLayout>

          <div className={index.box}>
            <h1>About</h1>
            <p>
              Serving the People is a 501(c)(3) non-profit organization that assists artists
              and creators in making meaningful connections both online and in person.
              Established in 2017, STP has launched a number of initiatives and developed a
              platform for connecting creators with audiences, as well as finding opportunities
              for collaboration and support.
            </p>
            <p>
              The STP community offers a variety of programming and events, including a weekly
              in person meeting led by artists in the community. Members can also enjoy weekly
              essays and other writing on STP&apos;s blog and newsletter, which also feature updates
              from the STP community.
            </p>
            <p>
              <strong>Subscribe to our weekly newsletter for happenings and events</strong>
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className={index.input}>
                <Grid container spacing={2} sx={{ maxWidth: "sm",  }}>
                  <Grid xs={6}>
                    <CssTextField
                      sx={{
                        "& fieldset": {
                          borderRadius: "0",
                          padding: "0px",
                          alignSelf: "center",
                        },
                        "& input": {
                          fontFamily: "Times New Roman",
                          padding: "11px",
                          height: "10px"
                        },
                      }}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={!!formik.errors.email}
                      helperText={formik.errors.email}
                    />
                  </Grid>
                  <Grid xs={6}>
                    <div className={index.buttonBody}>
                      <button className={index.button}>Subscribe</button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </form>
          </div>

        
    </DefaultLayout>
  )
}

export default About
