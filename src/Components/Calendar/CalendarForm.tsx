import React from "react"
import form from "src/styles/Form.module.css"
import axios from "axios"
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, TextField } from "@mui/material"
import { withStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { DateTimePicker } from "@mui/x-date-pickers"
import { useState } from "react"

const initialState = { name: "", type: "", address: "", website: "", starts_at: "", ends_at: "", phone: "", email: "", description: "" }

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

export default function CalendarForm(props: { token: string }) {
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ ...initialState })
  const handleChange = ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((currentData) => {
      return { ...currentData, [e.target.name]: e.target.value }
    })
  })
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      const response = await axios.post("/api/calendar/submit", data, { headers: { "Authorization": `Bearer ${props.token}` } })
      alert("Submitted")
    }
    catch {
      alert("Error happened while submitting form")
    }
    finally {
      setLoading(false)
    }
    // setData({ ...initialState })
    return false
  }

  return (
    <div className={form.test}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2} sx={{ maxWidth: "sm" }}  >
          <Grid xs={12} sm={6} >
            <CssTextField label="Name of Happening" required fullWidth color="secondary" onChange={handleChange}/>
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField label="Type of Happening"  required select fullWidth color="secondary" onChange={handleChange}>
              {type.map((option) => (
                <MenuItem className="bolder" key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </CssTextField>
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField label="Location"  required fullWidth color="secondary" onChange={handleChange}/>
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField label="Website"  fullWidth color="secondary" onChange={handleChange}/>
          </Grid>
          <Grid xs={12} sm={6}>
            <DateTimePicker label="Start Date/Time*" className={form.datePicker} sx={{ "& label.Mui-focused": { color: "black" }, "& fieldset": { border: "1px solid black!important", color: "black" }, "& .Mui-focused fieldset": { border: "2px solid black !important" } }} />
          </Grid>
          <Grid xs={12} sm={6}>
            <DateTimePicker label="End Date/Time" className={form.datePicker} sx={{ "& label.Mui-focused": { color: "black" }, "& fieldset": { border: "1px solid black!important", color: "black" }, "& .Mui-focused fieldset": { border: "2px solid black !important" } }} />
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField label="Telephone"  fullWidth color="secondary"></CssTextField>
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField label="Email"  required fullWidth color="secondary"></CssTextField>
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