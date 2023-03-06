import index from "./ElementLoader.module.css"

export default function ElementLoader() {

  return (
    <div className={index.body}>
      <h1 className={index.loading}>Loading</h1>
    </div>
  )
}
