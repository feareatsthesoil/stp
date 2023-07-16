import React from "react";
import DefaultLayout from "../Components/Layouts/DefaultLayout";
import RadioPlayer from "../Components/RadioPlayer";

const Radio = () => {
  return (
    <DefaultLayout>
      <div className="mb-5 flex h-[70vh] flex-col place-content-center">
        <div>
          <h1 className="text-center text-2xl font-bold smMobileX:hidden">
            Now Playing
          </h1>
          <RadioPlayer />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Radio;
