import { useState } from "react"

import form from "src/styles/Form.module.css"
import axios from 'axios'
import ElementLoader from "../ElementLoader"

const initialState = { name: "", type: "", location: "", website: "", start_date: "", end_date: "", start_time: "", end_time: "", phone: "", email: "", description: "" }

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
    const response = await axios.post("/api/calendar/submit", data)
    setLoading(false)
    alert("Submitted")

    setData({ ...initialState })
    return false
  }

  return (
    <div className={form.directoryForm}>
      <form onSubmit={handleSubmit}>
        {loading && <ElementLoader />}
        <div className={form.mainDesc}>
          <div className={form.left}>
            <div className={form.row}>
              <label className={form.label}> Name of Happening*</label>
              <input required name="name" onChange={handleChange} className={form.input} value={data['name']} type="text" />
            </div>
            <div className={form.row}>
              <label> Location*</label>
              <input required name="location" onChange={handleChange} className={form.input} value={data['location']} type="text" />
            </div>
            <div className={form.row}>
              <label> Date*</label>
              <input required name="start_date" onChange={handleChange} className={form.input} value={data['start_date']} type="text" />
            </div>
            <div className={form.row}>
              <label> Time*</label>
              <input required name="start_time" onChange={handleChange} className={form.input} value={data['start_time']} type="text" />
            </div>
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
              <input name="end_date" onChange={handleChange} className={form.input} value={data['end_date']} type="text" />
            </div>
            <div className={form.row}>
              <label> End Time</label>
              <input name="end_time" onChange={handleChange} className={form.input} value={data['end_time']} type="text" />
            </div>
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