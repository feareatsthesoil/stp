import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import css from "src/styles/Submit.module.css";
import AuthLayout from "../../../Components/Layouts/AuthLayout";
import DefaultLayoutCentered from "../../../Components/Layouts/DefaultLayoutCentered";
import DeleteResourceButton from "../../../Components/Resources/DeleteResourceButton";
import ResourcesForm from "../../../Components/Resources/resourcesForm";
import { UserContext } from "../../../Components/UserContext";
import { Resource } from "../../../types";

export default function EditResource() {
  const userData = useContext(UserContext);
  const { userId } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<Resource>();
  useEffect(() => {
    if (!id) return () => {};
    axios.get("/api/resources/" + id).then(({ data }) => {
      setData(data);
    });
  }, [id]);
  if (!data) return <DefaultLayoutCentered>Loading...</DefaultLayoutCentered>;
  return (
    <AuthLayout>
      <div className={css.wrapper}>
        <div className={css.box}>
          <h1>Add to Links</h1>
        </div>
        {userId == data?.userId && (
          <>
            <ResourcesForm data={data} after={() => router.push("/links")} />
            <div className={css.delete}>
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
