import index from "src/styles/ContactForm.module.css"

const max = 300;

export default function ContactForm() {
  return (
    <div className={index.body}>
      <form>
        <div className={index.bio} >
          <div className={index.left}>
            <div className={index.row}>
              <label> Name*</label>
              <input required name="name" className={index.input} type="text" />
            </div>
            <div className={index.row}>
              <label> Email*</label>
              <input required name="email" className={index.input} type="text" />
            </div>
            <div className={index.row}>
              <label> City*</label>
              <input required name="city" className={index.input} type="text" />
            </div>
            <div className={index.row}>
              <label> Category*</label>
              <input required name="category" className={index.input} type="text" />
            </div>
          </div>
          <div className={index.right}>
            <div className={index.row}>
              <label> Phone Number</label>
              <input name="phone" className={index.input} type="text" />
            </div>
            <div className={index.row}>
              <label> Website</label>
              <input name="website" className={index.input} type="text" />
            </div>
            <div className={index.row}>
              <label> Twitter</label>
              <input name="twitter" className={index.input} type="text" />
            </div>
            <div className={index.row}>
              <label> Instagram</label>
              <input name="instagram" className={index.input} type="text" />
            </div>
          </div>
        </div>
        <div className={index.bottom}>
          <div className={index.row}>
            <div className={index.descCalendar}>
              <label htmlFor="textarea">
                Short Description &nbsp;
              </label>
              <textarea placeholder="0/300"name="description" id="textarea" maxLength={max} className={index.textarea} />
            </div>
          </div>
          <div className={index.bottomButton}>
            <div className={index.checkBoxBody}>
              <input className={index.checkBox} type="checkbox" name="display" >
              </input>
              <label htmlFor="display">Display in directory</label>
            </div>
            <button className={index.button}>Save</button>
          </div>
        </div>
      </form >
    </div >
  )
}