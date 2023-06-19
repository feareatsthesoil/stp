import React from "react";

import { useRouter } from "next/router"

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, TextField } from "@mui/material";
import { createComment, createPost } from "../../utils/services";
export default function CommentForm({id, onComplete= ()=>{}}: {id: number, onComplete: ()=>void}){
  const router = useRouter()

    const formik = useFormik({

        validationSchema: Yup.object({

         content: Yup.string().required("required")

        }),
        initialValues: { content: ""}, onSubmit: async (values, helpers) => {

          const dataToSubmit = {
            ...values
          }
        //   const response = data?.id ? await axios.put(`/api/directory/${data.id}`, dataToSubmit) : await axios.post("/api/directory/submit", dataToSubmit)
        await createComment(id, dataToSubmit)
        helpers.setSubmitting(false)
       helpers.resetForm()
       onComplete()

        }
      })

      return <form onSubmit={formik.handleSubmit}>

         <TextField  label="Comment"
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