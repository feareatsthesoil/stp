import React from "react";
import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, TextField } from "@mui/material";
import { createPost } from "../../utils/services";
export default function PostForm({slug}: {slug: string}){
  const router = useRouter()

    const formik = useFormik({

        validationSchema: Yup.object({
         title: Yup.string().required("required"),
         content: Yup.string().required("required")

        }),
        initialValues: {title: "", content: ""}, onSubmit: async (values, helpers) => {

          const dataToSubmit = {
            ...values
          }
        //   const response = data?.id ? await axios.put(`/api/directory/${data.id}`, dataToSubmit) : await axios.post("/api/directory/submit", dataToSubmit)
        await createPost(slug, dataToSubmit)
        helpers.setSubmitting(false)
       helpers.resetForm()

            router.push("/chan/"+ slug)
        }
      })

      return <form onSubmit={formik.handleSubmit}>
        <TextField  label="Name"
        name= "title"
                 fullWidth
                color="secondary"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={!!formik.errors.title}
                helperText={formik.errors.title}
                disabled={formik.isSubmitting}/>


         <TextField  label="Content"
         rows={3}
                 name="content"
                 fullWidth
                multiline={true}
                color="secondary"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={!!formik.errors.content}
                helperText={formik.errors.content}
                disabled={formik.isSubmitting}/>

                <Button type="submit" color="secondary" variant="contained">Submit</Button>
      </form >
}