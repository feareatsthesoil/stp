import { useState } from "react"
import form from "src/styles/Form.module.css"
import axios from 'axios'
import ElementLoader from "../ElementLoader"

const initialState = { name: "", address: "", email: "", category: "", website: "", phone: "", description: "" }

export default function DirectoryForm() {
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
    const response = await axios.post("/api/directory/submit", data)
    setLoading(false)
    alert("Submitted")

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
              <label className={form.label}> Name/Business*</label>
              <input required name="name" onChange={handleChange} className={form.input} value={data['name']} type="text" />
            </div>
            <div className={form.row}>
              <label> Address</label>
              <input name="address" onChange={handleChange} className={form.input} value={data['address']} type="text" />
            </div>
            <div className={form.row}>
              <label> Email</label>
              <input name="email" onChange={handleChange} className={form.input} value={data['email']} type="text" />
            </div>
          </div>
          <div className={form.right}>
            <div className={form.row}>
              <label> Category*</label>
              <input required name="category" onChange={handleChange} className={form.input} value={data['category']} type="text" /
              ></div>
            <div className={form.row}>
              <label> Website*</label>
              <input required name="website" onChange={handleChange} className={form.input} value={data['website']} type="text" />
            </div>
            <div className={form.row}>
              <label> Phone Number</label>
              <input name="phone" onChange={handleChange} className={form.input} value={data['phone']} type="text" />
            </div>
          </div>
        </div>
        <div className={form.bottom}>
          <div className={form.desc}>
            <label htmlFor="textarea">
              Short Description &nbsp;
            </label>
            <textarea id="textarea" name="description" onChange={handleChange} className={form.textarea} value={data['description']} />
          </div>
        </div>
        <div className={form.bottomButton}>
          <button className={form.button}>Submit</button>
        </div>
      </form>
    </div>
  )
}