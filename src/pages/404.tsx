import React from "react";
import DefaultLayout from "../Components/Layouts/DefaultLayout";

export default function Custom404() {
  return (
    <DefaultLayout>
      <div className="my-4">
        <h1 className="text-xl font-bold">404 - Page Not Found</h1>
      </div>
    </DefaultLayout>
  );
}
