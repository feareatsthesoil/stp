import { useState } from "react"
import form from "src/styles/Form.module.css"
import axios from 'axios'
import ElementLoader from "../ElementLoader"
import Header from "../../Components/Header/Header"
        

const initialState = { name: "", type: "", address: "", website: "", starts_at: "", ends_at: "", phone: "", email: "", description: "" }

export default function CalendarForm() {
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
    try{
    const response = await axios.post("/api/calendar/submit", data)
   
    alert("Submitted")

  }
  catch{
    alert("Error happened while submitting form")
  }
  finally{
    setLoading(false)
  }
   // setData({ ...initialState })
    return false
  }

  return (
    
    <div className={form.body}>

      <form onSubmit={handleSubmit}>
        {loading && <ElementLoader />}
        <div className={form.bio}>
          <div className={form.left}>
            <div className={form.row}>
              <label> Name of Happening*</label>
              <input required name="name" onChange={handleChange} className={form.input} value={data['name']} type="text" />
            </div>
            <div className={form.row}>
              <label> Location*</label>
              <input required name="address" onChange={handleChange} className={form.input} value={data['address']} type="text" />
            </div>
            <div className={form.row}>
              <label> Date*</label>
              <input  type="datetime-local" required name="starts_at" onChange={handleChange} className={form.input} value={data['starts_at']}  />
            </div>
            {/* <div className={form.row}>
              <label> Time*</label>
              <input required name="start_time" onChange={handleChange} className={form.input} value={data['start_time']} type="text" />
            </div> */}
            <div className={form.row}>
              <label> Telephone</label>
              <input name="phone" onChange={handleChange} className={form.input} value={data['phone']} type="text" />
            </div>
          </div>
          <div className={form.right}>
            <div className={form.row}>
              <label> Type of Happening*</label>
              <input required name="type" onChange={handleChange} className={form.input} value={data['type']} type="text" />
            </div>
            <div className={form.row}>
              <label> Website</label>
              <input name="website" onChange={handleChange} className={form.input} value={data['website']} type="text" />
            </div>
            <div className={form.row}>
              <label> End Date</label>
              <input name="ends_at" onChange={handleChange} className={form.input} value={data['ends_at']} type="datetime-local" />
            </div>
            {/* <div className={form.row}>
              <label> End Time</label>
              <input name="end_time" onChange={handleChange} className={form.input} value={data['end_time']} type="text" />
            </div> */}
            <div className={form.row}>
              <label> Email*</label>
              <input required name="email" onChange={handleChange} className={form.input} value={data['email']} type="text" />
            </div>
          </div>
        </div>
        <div className={form.bottom}>
          <div className={form.descCalendar}>
            <label htmlFor="textarea">
              Short Description &nbsp;
            </label>
            <textarea id="textarea" name="description" onChange={handleChange} className={form.textarea} value={data['description']} />
          </div>
        </div>
        <div className={form.bottomButton}>
          <button disabled={loading} className={form.button}>Submit</button>
        </div>
      </form>
    </div>
  )
}