import { useRouter } from "next/router";
import AuthLayout from "../../Components/Layouts/AuthLayout";
import ResourcesForm from "../../Components/Resources/resourcesForm";

export default function () {
  const router = useRouter();
  return (
    <AuthLayout>
      <div className="flex h-[70vh] flex-col place-content-center items-center">
        <div className="m-4 flex flex-col flex-nowrap">
          <h1 className="text-lg font-bold">Add to Links</h1>
        </div>
        <ResourcesForm after={() => router.push("/links")} />
      </div>
    </AuthLayout>
  );
}
