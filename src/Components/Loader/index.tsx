import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <h2 className={css.loading}>Loading</h2>
    </div>
  );
}
