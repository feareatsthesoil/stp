import axios from "axios";
import { useConfirm } from "material-ui-confirm";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";
import ResourcesList from "../../Components/Resources";
import { UserContext } from "../../Components/UserContext";
import { Resource } from "../../types";

export default function () {
  const { loggedIn } = useContext(UserContext);
  const confirm = useConfirm();
  const router = useRouter();
  const id = router.query;
  const [data, setData] = useState<Resource>();

  useEffect(() => {
    if (!id) return () => {};
    axios.get("/api/resources/" + id).then(({ data }) => {
      setData(data);
    });
  }, [id]);

  const handleClick = () => {
    if (!loggedIn) {
      return confirm({
        title: "Please log in",
        description: "Please log in to submit to links.",
        confirmationText: "Log in",
      }).then(() => {
        router.push("/login?redirect_url=/links");
      });
    } else {
      return router.push("/links/submit");
    }
  };

  return (
    <>
      <div className="bg-[#F4F4FE]">
        <DefaultLayout>
          <div className="flex w-[96vw] flex-col place-content-center border-[0] border-b border-solid border-black p-5 text-center text-sm font-bold">
            <p>
              All links are submitted by the Serving the People community. All
              submissions are subject to review.&nbsp;
            </p>
            <Link
              className="text-blue-600 underline hover:text-indigo-600"
              href="#"
              onClick={handleClick}
            >
              Submit link
            </Link>
          </div>
          <div className="py-5">
            <ResourcesList />
          </div>
        </DefaultLayout>
      </div>
    </>
  );
}
