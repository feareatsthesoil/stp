import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthLayout from "../../../Components/Layouts/AuthLayout";
import DeleteResourceButton from "../../../Components/Resources/DeleteResourceButton";
import ResourcesForm from "../../../Components/Resources/resourcesForm";
import { UserContext } from "../../../Components/UserContext";
import { Resource } from "../../../types";
import DefaultLayout from "../../../Components/Layouts/DefaultLayout";

export default function EditResource() {
  const userData = useContext(UserContext);
  const { userId } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<Resource>();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (!id) return () => {};
    axios.get("/api/resources/" + id).then(({ data }) => {
      setData(data);
    });
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!data) return <DefaultLayout>Loading...</DefaultLayout>;
  return (
    <AuthLayout>
      <div className="flex h-[70vh] flex-col place-content-center items-center">
        <div className="m-4 flex flex-col flex-nowrap">
          <h1 className="text-lg font-bold">Add to Links</h1>
        </div>
        {userId == data?.userId && (
          <>
            <ResourcesForm data={data} after={() => router.push("/links")} />
            <div
              style={{
                marginTop: "-57px",
                marginLeft: windowWidth >= 665 ? "520px" : "calc(100% - 60px)",
              }}
            >
              <DeleteResourceButton
                id={data.id}
                after={() => router.push("/links")}
              />
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
