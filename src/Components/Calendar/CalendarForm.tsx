import { useState } from "react"
import React from "react"
import form from "src/styles/Form.module.css"
import axios from 'axios'
import ElementLoader from "../ElementLoader"
import Header from "../../Components/Header/Header"
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, MenuItem, TextField } from "@mui/material"
import { withStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from "@mui/x-date-pickers"


const initialState = { name: "", type: "", address: "", website: "", starts_at: "", ends_at: "", phone: "", email: "", description: "" }



const CssTextField = withStyles({
  root: {
   
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderWidth: '2px',
      },
    },
  },
})(TextField);

const CssDateTimePicker = withStyles({
  root: {
    borderColor: 'black',
    background: "red",
    height: 1000,
    '& .MuiFormControl-root': {
      
        borderColor: 'black',
        backgroundC0: "yellow",
      
    
        borderWidth: '2px',
    
    },
  },
})(DateTimePicker);

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

const theme = createTheme({
  palette: {

    secondary: {
      main: '#000',
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
        <hr style={{ border: 0 }} />
        <Grid container spacing={2} sx={{ maxWidth: 'sm' }}  >
          <Grid xs={12} sm={6} >
            <CssTextField color="secondary" fullWidth label="Name of Happening*" />
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField color="secondary" fullWidth label="Type of Happening*" select>
              {type.map((option) => (
                <MenuItem className="bolder" key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </CssTextField>
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField color="secondary" fullWidth label="Location*"></CssTextField>
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField fullWidth label="Website" color="secondary"></CssTextField>
          </Grid>
          <Grid xs={12} sm={6}>
            
              <CssDateTimePicker sx={{"& label.Mui-focused": {color: "black"}, "& fieldset": {border: "1px solid black!important", color:"black"}, "& .Mui-focused fieldset": {border: "2px solid black !important"}}} className={form.datePicker} label="Start Date/Time*" />
          
          </Grid>
          <Grid xs={12} sm={6}>
          
              <CssDateTimePicker sx={{"& fieldset": {border: "1px solid black!important",}, "&:hover fieldset": {border: "2px solid black !important"}}}className={form.datePicker} label="End Date/Time" />
       
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField fullWidth label="Telephone" color="secondary"></CssTextField>
          </Grid>
          <Grid xs={12} sm={6}>
            <CssTextField color="secondary" fullWidth label="Email*"></CssTextField>
          </Grid>
          <Grid xs={12}>
            <CssTextField multiline id="mui-theme-provider-outlined-input" variant="outlined" color="secondary" className={form.description} fullWidth label="Short Description" onChange={e => setCount(e.target.value.length)}  rows={4} inputProps={{ maxLength: 300, style: { color: 'black'} }}/>
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