import index from "./Loader.module.css"

export default function Loader() {
  return (
    <div className={index.body}>
      <h2 className={index.loading}>Loading</h2>
    </div>
  )
}