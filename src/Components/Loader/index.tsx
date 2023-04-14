import index from "./Loader.module.css"

export default function Loader() {
  return (
    <div className={index.body}>
      <div className={index.subBody}>
        <h2 className={index.loading}>Loading</h2>
      </div>
    </div>
  )
}