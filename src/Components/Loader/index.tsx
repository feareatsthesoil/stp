import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <h2 className={css.loading}>Loading</h2>
    </div>
  );
}
