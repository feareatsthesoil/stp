import { useState } from "react"
import form from "src/styles/Form.module.css"
import axios from 'axios'
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, TextField } from "@mui/material"
import { withStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import React from "react";

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

export default function DirectoryForm({profile=false}: {profile: boolean}) {
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ ...initialState })
  const changeData = ((fieldName: string, value: any)=>{
    setData((currentData) => {
      return { ...currentData, [fieldName]: value }
    })



  })
  const handleChange = ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    changeData(e.target.name, e.target.value)
  })
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    const dataToSubmit = {
      ...data, profile
    }
    const response = await axios.post("/api/directory/submit", dataToSubmit)
    setLoading(false)
    alert("Submitted")

   // setData({ ...initialState })
    return false
  }
  return (
    <div className={form.test}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2} sx={{ maxWidth: "sm" }}  >
          <Grid xs={12} sm={6} >
            <CssTextField label="Name/Business" required fullWidth color="secondary" onChange={handleChange}/>
          </Grid>
          <Grid xs={12} sm={6}>
          <CssTextField label="Category"  required select fullWidth color="secondary" onChange={handleChange}>
              {type.map((option) => (
                <MenuItem className="bolder" key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </CssTextField>
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField label="Location" fullWidth color="secondary" onChange={handleChange}/>
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField label="Website" fullWidth color="secondary" onChange={handleChange}/>
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField label="Telephone" fullWidth color="secondary"></CssTextField>
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField label="Email" required fullWidth color="secondary"></CssTextField>
          </Grid>
          <Grid xs={12}>
            <CssTextField label="Short Description"  multiline fullWidth className={form.description} id="mui-theme-provider-outlined-input" variant="outlined" color="secondary" rows={4} inputProps={{ maxLength: 300, style: { color: "black" } }} onChange={e => setCount(e.target.value.length)} />
          </Grid>
          <Grid xs={12}>
            <p>{count}/300</p>
            <button className={form.button}>Save</button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  )
}