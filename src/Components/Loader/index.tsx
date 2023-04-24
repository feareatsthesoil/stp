import css from "./Loader.module.css"

export default function Loader() {
  return (
    <div className={css.body}>
      <h2 className={css.loading}>Loading</h2>
    </div>
  )
}