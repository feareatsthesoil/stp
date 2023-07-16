import React from "react";
import DefaultLayout from "../Components/Layouts/DefaultLayout";

export default function Custom500() {
  return (
    <DefaultLayout>
      <div className="my-4">
        <h1 className="text-xl font-bold">500 - Server-side error occurred</h1>
      </div>
    </DefaultLayout>
  );
}
