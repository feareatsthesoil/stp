import Link from "next/link";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";

export default function checkoutCancel() {
  return (
    <DefaultLayout>
      <div className="my-4 flex h-[70vh] flex-col place-content-center">
        <h1 className="text-xl font-bold">Payment cancelled.</h1>
        <p>
          You can try again{" "}
          <Link className="underline" href="/membership">
            here
          </Link>
        </p>
      </div>
    </DefaultLayout>
  );
}
